import { nodes } from "@pufflig/ps-nodes";
import { NodeType, nodes as nodeConfigMap } from "@pufflig/ps-nodes-config";
import { Param, ParamValue } from "@pufflig/ps-types";
import { Chain, ChainEdge, NodeState } from "../types";

function paramToDefaults(params: Param[]) {
  const defaults: Record<string, ParamValue> = {};
  for (const param of params) {
    defaults[param.id] = param.defaultValue;
  }
  return defaults;
}

export function applyDefaultInputs(nodeStateData: Record<string, ParamValue> | undefined, nodeType: NodeType) {
  const nodeConfig = nodeConfigMap[nodeType];
  const inputs = [...nodeConfig.inputs, ...nodeConfig.parameters];
  const defaults = paramToDefaults(inputs);
  return { ...defaults, ...(nodeStateData || {}) };
}

function getEdgeMap(edge: ChainEdge[]): Record<string, string> {
  const res: Record<string, string> = {};
  for (const e of edge) {
    res[e.source_handle] = e.target_handle;
  }
  return res;
}

function mapOutputToInput(output: Record<string, ParamValue>, map: Record<string, string>) {
  const res: Record<string, ParamValue> = {};
  for (const [key, value] of Object.entries(map)) {
    res[value] = output[key];
  }
  return res;
}

// updateNodeInputs
export async function updateNodeInputs() {}

/**
 * This function updates the input state of a node and executes the node on the new input.
 * Read all target nodes and update their input state.
 * Repeat until there are no more target nodes.
 *
 * @param chain current definition and state of the chain
 * @param nodeId id of the node to run
 * @param input input to update the node inputs with, empty object if existing inputs should be used
 * @param cbs functions to call when a node state is updated or an error occurs
 */
export async function runFromNode(chain: Chain, nodeId: string, input: Record<string, ParamValue>, cbs: Callbacks) {
  // avoid hanging on loops by keeping track of the nodes that have been visited
  // current implementation allows a node to be visited only as many times as it has inputs
  const visitedNodes: Record<string, number> = {};
  let chainState: Record<string, NodeState> = chain.state;

  async function _runFromNode(
    chain: Chain,
    nodeId: string,
    input: Record<string, ParamValue>,
    cbs: Callbacks,
    isChild = false
  ) {
    const nodeDefinition = chain.definition.nodes.find((n) => n.id === nodeId);
    if (!nodeDefinition) {
      throw new Error(`Definition for node ${nodeId} not found`);
    }

    // parse the input
    const nodeType = nodeDefinition.type;
    const nodeState = chainState[nodeId];
    const prevInput = nodeState?.data;
    const parsedInput = await nodes[nodeType].parseInput(input, prevInput);

    // a node can only be visited as many times as it has connected inputs
    const inputEdges = chain.definition.edges.filter((e) => e.target === nodeId);
    const numInputs = inputEdges.length;

    if (isChild && (visitedNodes[nodeId] || 0) > numInputs) {
      return;
    }

    visitedNodes[nodeId] = visitedNodes[nodeId] ? visitedNodes[nodeId] + 1 : 1;

    const newInput = { ...applyDefaultInputs(nodeState?.data, nodeType), ...parsedInput };
    const newState = { ...nodeState, data: newInput };

    let newChainState = { ...chainState, [nodeId]: newState };
    chainState = newChainState;

    cbs.onNodeStateUpdate?.(nodeId, newState);

    // do not run nodes in the chain that have autorun=false
    // except for the root node
    if (isChild) {
      if (nodeDefinition.autorun === false) {
        return;
      }
    }

    // get all target nodes of the node we updated the input of
    // avoid running the node if it has no target nodes
    const targetNodes = chain.definition.edges.filter((e) => e.source === nodeId);
    if (targetNodes.length === 0) {
      return;
    }

    // run the node we updated the input of
    let res;
    try {
      // resolve references in the input
      res = await nodes[nodeType].execute(newInput);
    } catch (error) {
      // if running the node fails, stop the chain
      cbs.onNodeError?.(nodeId, error as Error);
      return;
    }

    const editedKeys = Object.keys(res);

    // ignore target nodes that are not connected to the values that have been edited
    const targetNodeIds = targetNodes.filter((e) => editedKeys.includes(e.source_handle)).map((e) => e.target);

    // update the state of all target nodes
    for (const targetNodeId of targetNodeIds) {
      // edges between this node and the target node
      const edges = chain.definition.edges.filter((e) => e.source === nodeId && e.target === targetNodeId);
      const edgeMap = getEdgeMap(edges);
      const mappedInput = mapOutputToInput(res, edgeMap);
      await _runFromNode(chain, targetNodeId, mappedInput, cbs, true);
    }
  }

  await _runFromNode(chain, nodeId, input, cbs);

  return chainState;
}
