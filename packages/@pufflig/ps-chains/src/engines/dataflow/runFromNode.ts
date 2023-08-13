import { ParamValue } from "@pufflig/ps-types";
import { Chain, NodeState, RunOptions } from "../../types";
import { resolveVariables } from "./utils/resolveVariables";
import { applyDefaultInputs, getEdgeMap, mapOutputToInput } from "./utils/utils";

/**
 * This function updates the input state of a node and executes the node on the new input.
 * Read all target nodes and update their input state.
 * Repeat until there are no more target nodes.
 *
 * @param nodeId id of the node to run
 * @param input input to update the node inputs with, empty object if existing inputs should be used
 * @param chain current definition and state of the chain
 * @param runOptions functions to call when a node state is updated or an error occurs
 */
export async function runFromNode(
  nodeId: string,
  input: Record<string, ParamValue>,
  chain: Chain,
  runOptions?: RunOptions
) {
  // avoid hanging on loops by keeping track of the nodes that have been visited
  // current implementation allows a node to be visited only as many times as it has inputs
  const visitedNodes: Record<string, number> = {};
  let chainState: Record<string, NodeState> = chain.state;

  async function _runFromNode(
    nodeId: string,
    input: Record<string, ParamValue>,
    chain: Chain,
    runOptions?: RunOptions,
    isChild = false
  ) {
    const nodeConfig = chain.definition.nodes[nodeId];
    const nodeDefinition = chain.nodeTypes[nodeConfig?.type];
    if (!nodeConfig || !nodeDefinition) {
      throw new Error(`Definition for node ${nodeId} not found`);
    }

    // parse the input
    const nodeState = chainState[nodeId];
    const prevInput = nodeState?.input;
    const parsedInput = await nodeDefinition.parseInput(input, prevInput);

    // a node can only be visited as many times as it has connected inputs
    const inputEdges = Object.values(chain.definition.edges).filter((e) => e.target === nodeId);
    const numInputs = inputEdges.length;

    if (isChild && (visitedNodes[nodeId] || 0) > numInputs) {
      return;
    }

    visitedNodes[nodeId] = visitedNodes[nodeId] ? visitedNodes[nodeId] + 1 : 1;

    const newInput = { ...applyDefaultInputs(prevInput, nodeDefinition), ...parsedInput };
    const newState: NodeState = { ...nodeState, input: newInput };

    let newChainState = { ...chainState, [nodeId]: newState };
    chainState = newChainState;

    runOptions?.onNodeInputUpdate?.(nodeId, newState);

    // do not run nodes in the chain that have autorun=false
    // except for the root node
    if (isChild) {
      if (nodeConfig.autorun === false) {
        return;
      }
    }

    // get all target nodes of the node we updated the input of
    // avoid running the node if it has no target nodes
    const targetNodes = Object.values(chain.definition.edges).filter((e) => e.source === nodeId);
    if (targetNodes.length === 0) {
      return;
    }

    let resolvedInput = newInput;
    try {
      resolvedInput = await resolveVariables(newInput, runOptions?.resolveReferences || (async (i) => i));
    } catch (error) {
      runOptions?.onNodeRunError?.(nodeId, error as Error);
      return;
    }

    // run the node we updated the input of
    let res;
    try {
      // resolve references in the input
      res = await nodeDefinition.execute(resolvedInput, prevInput);
      runOptions?.onNodeRunComplete?.(nodeId, res);
      // break the chain if the node returns null
      if (res === null) return;
    } catch (error) {
      // if running the node fails, stop the chain
      runOptions?.onNodeRunError?.(nodeId, error as Error);
      return;
    }

    const editedKeys = Object.keys(res);

    // ignore target nodes that are not connected to the values that have been edited
    const targetNodeIds = targetNodes.filter((e) => editedKeys.includes(e.sourceHandle)).map((e) => e.target);

    // update the state of all target nodes
    for (const targetNodeId of targetNodeIds) {
      // edges between this node and the target node
      const edges = Object.values(chain.definition.edges).filter(
        (e) => e.source === nodeId && e.target === targetNodeId
      );
      const edgeMap = getEdgeMap(edges);
      const mappedInput = mapOutputToInput(res, edgeMap);
      await _runFromNode(targetNodeId, mappedInput, chain, runOptions, true);
    }
  }

  await _runFromNode(nodeId, input, chain, runOptions);

  return chainState;
}
