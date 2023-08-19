import { ParamValue } from "@pufflig/ps-types";
import _ from "lodash";
import { Chain, RunOptions } from "../../types";
import { updateNodeInput } from "./updateNodeInput";
import { resolveVariables } from "./utils/resolveVariables";
import { getEdgeMap, mapOutputToInput } from "./utils/utils";
import { getReachableNodes } from "./utils/getReachableNodes";
import pino from "pino";

const logger = pino();

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
  logger.level = runOptions?.logLevel || "error";

  // track the number of times a node has been run
  const runs: Record<string, number> = {};

  // avoid hanging on loops by keeping track of the edges that have been visited
  const visitedEdges: string[] = [];

  const nodeConfig = chain.definition.nodes[nodeId];
  const nodeDefinition = chain.nodeTypes[nodeConfig?.type];
  if (!nodeConfig || !nodeDefinition) {
    throw new Error(`Definition for node ${nodeId} not found`);
  }

  // track nodes that are reachable from the current node
  const reachableNodes = getReachableNodes(nodeId, chain);

  // chain state after the update
  let newChainState = _.cloneDeep(chain.state);

  async function run(nodeId: string, input: Record<string, ParamValue>, runOptions?: RunOptions, isChild = false) {
    const previousState = { ...newChainState[nodeId] };
    const nodeConfig = chain.definition.nodes[nodeId];
    const nodeDefinition = chain.nodeTypes[nodeConfig?.type];
    if (!nodeConfig || !nodeDefinition) {
      throw new Error(`Definition for node ${nodeId} not found`);
    }

    // update the current node state
    const updatedChain = { ...chain, state: newChainState };
    const updatedChainState = await updateNodeInput(nodeId, input, updatedChain, runOptions);
    newChainState[nodeId] = { ...updatedChainState[nodeId] };
    logger.debug({ nodeId, input, nodeState: updatedChainState[nodeId] }, "Updated node input");

    // guard against infinite loops
    const isAlreadyRun = (runs[nodeId] || 0) > 0;

    // don't run the node if it has no target nodes
    const targetNodes = Object.values(chain.definition.edges).filter((e) => e.source === nodeId);
    const hasTargets = targetNodes.length > 0;

    // autorun false blocks this node from running, unless it is the root node
    const canAutorun = isChild ? nodeConfig.autorun !== false : true;

    // stop flow if the node should not run
    const shouldRun = hasTargets && canAutorun && !isAlreadyRun;
    logger.debug({ nodeId, isAlreadyRun, hasTargets, canAutorun, shouldRun }, "Check if node should run");
    if (!shouldRun) {
      return;
    }

    // track the run
    runs[nodeId] = runs[nodeId] ? runs[nodeId] + 1 : 1;

    // resolve variables to use during the run
    const newInput = newChainState[nodeId]?.input;
    let resolvedInput: Record<string, ParamValue> = {};
    try {
      resolvedInput = await resolveVariables(newInput, runOptions?.resolveReferences || (async (i) => i));
    } catch (error) {
      logger.error({ error, nodeId }, "Error resolving variables");
      runOptions?.onNodeRunError?.(nodeId, error as Error);
      return;
    }

    // run the node
    let res: Record<string, ParamValue> | null = null;
    try {
      // resolve references in the input
      res = await nodeDefinition.execute(resolvedInput, previousState.input);
      runOptions?.onNodeRunComplete?.(nodeId, res);
      logger.debug({ nodeId, res }, "Node result");
      // break the chain if the node returns null
      if (res === null) return;
    } catch (error) {
      logger.error({ error, nodeId }, "Error running node");
      // if running the node fails, stop the chain
      runOptions?.onNodeRunError?.(nodeId, error as Error);
      return;
    }

    // ignore target nodes that are not connected to the values that have been edited
    const editedKeys = Object.keys(res);
    const targetNodeIds = targetNodes.filter((e) => editedKeys.includes(e.sourceHandle)).map((e) => e.target);
    logger.debug({ nodeId, targetNodeIds }, "Target nodes");

    // update the input of all target nodes
    for (const targetNodeId of targetNodeIds) {
      // edges between this node and the target node
      const edges = Object.values(chain.definition.edges).filter(
        (e) => e.source === nodeId && e.target === targetNodeId
      );
      const edgeMap = getEdgeMap(edges);
      const mappedInput = mapOutputToInput(res, edgeMap);

      // append to visited edges
      visitedEdges.push(...edges.map((e) => e.id));

      // only run the node if all incoming edges have been resolved and ignore parents that are not reachable
      const incomingEdges = Object.values(chain.definition.edges)
        .filter((e) => e.target === targetNodeId)
        .filter((e) => chain.definition.nodes[e.source].autorun !== false)
        .filter((e) => reachableNodes.has(e.source));
      const areIncomingEdgesVisited = incomingEdges.every((e) => visitedEdges.includes(e.id));

      if (areIncomingEdgesVisited) {
        logger.debug({ nodeId, targetNodeId }, "Running target node");
        await run(targetNodeId, mappedInput, runOptions, true);
      } else {
        logger.debug({ nodeId, targetNodeId }, "Updating target node inputs");
        const update = await updateNodeInput(targetNodeId, mappedInput, updatedChain, runOptions);
        newChainState = { ...newChainState, [targetNodeId]: update[targetNodeId] };
      }
    }
  }

  await run(nodeId, input, runOptions);

  return newChainState;
}
