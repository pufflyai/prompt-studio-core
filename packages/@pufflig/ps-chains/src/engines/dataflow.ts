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

function applyDefaultInputs(nodeState: NodeState | undefined, nodeType: NodeType) {
  const nodeConfig = nodeConfigMap[nodeType];
  const inputs = [...nodeConfig.inputs, ...nodeConfig.parameters];
  const defaults = paramToDefaults(inputs);
  return { ...defaults, ...(nodeState?.data || {}) };
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

/**
 * This function updates the input state of a node and executes the node on the new input.
 * Read all target nodes and update their input state.
 * Repeat until there are no more target nodes.
 *
 * @param chain current definition and state of the chain
 * @param nodeId id of the node to run
 * @param input input to update the node inputs with
 * @param onNodeStateUpdate callback that triggers when a node input is updated
 */
export async function runFromNode(
  chain: Chain,
  nodeId: string,
  input: Record<string, ParamValue>,
  onNodeStateUpdate: (id: string, state: object) => void
) {
  // avoid hanging on loops by keeping track of the nodes that have been visited
  // current implementation allows a node to be visited only as many times as it has inputs
  const visitedNodes: Record<string, number> = {};
  let chainState: Record<string, NodeState> = chain.state;

  async function _runFromNode(
    chain: Chain,
    nodeId: string,
    input: Record<string, ParamValue>,
    onNodeStateUpdate: (id: string, state: object) => void,
    isChild = false
  ) {
    const nodeDefinition = chain.definition.nodes.find((n) => n.id === nodeId);
    if (!nodeDefinition) {
      throw new Error(`Definition for node ${nodeId} not found`);
    }

    // a node can only be visited as many times as it has connected inputs
    const inputEdges = chain.definition.edges.filter((e) => e.target === nodeId);
    const numInputs = inputEdges.length;

    if (isChild && (visitedNodes[nodeId] || 0) > numInputs) {
      return;
    }

    visitedNodes[nodeId] = visitedNodes[nodeId] ? visitedNodes[nodeId] + 1 : 1;

    const nodeType = nodeDefinition.type;
    const nodeState = chainState[nodeId];
    const newInput = { ...applyDefaultInputs(nodeState, nodeType), ...input };
    const newState = { ...nodeState, data: newInput };

    let newChainState = { ...chainState, [nodeId]: newState };
    chainState = newChainState;

    onNodeStateUpdate(nodeId, newState);

    // do not run nodes in the chain that have autorun=false
    // except for the root node
    if (isChild) {
      if (nodeDefinition.autorun === false) {
        return;
      }
    }

    // get all target nodes
    const targetNodes = chain.definition.edges.filter((e) => e.source === nodeId);
    if (targetNodes.length === 0) {
      return;
    }

    // run the node we updated the input of
    const res = await nodes[nodeType].execute(newInput);
    const editedKeys = Object.keys(res);

    // ignore target nodes that are not connected to the values that have been edited
    const targetNodeIds = targetNodes.filter((e) => editedKeys.includes(e.source_handle)).map((e) => e.target);
    if (targetNodeIds.length === 0) {
      return;
    }

    // update the state of all target nodes
    for (const targetNodeId of targetNodeIds) {
      // edges between this node and the target node
      const edges = chain.definition.edges.filter((e) => e.source === nodeId && e.target === targetNodeId);
      const edgeMap = getEdgeMap(edges);
      const mappedInput = mapOutputToInput(res, edgeMap);
      await _runFromNode(chain, targetNodeId, mappedInput, onNodeStateUpdate, true);
    }
  }

  await _runFromNode(chain, nodeId, input, onNodeStateUpdate);

  return chainState;
}
