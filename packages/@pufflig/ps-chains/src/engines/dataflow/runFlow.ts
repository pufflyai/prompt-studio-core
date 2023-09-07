import { ParamValue } from "@pufflig/ps-types";
import pino from "pino";
import { Flow, RunOptions } from "../../types";
import { executionPrefix, getDefaultTargets, identity } from "./constants";
import { updateNodeInput } from "./updateNodeInput";
import { getReachableNodes } from "./utils/getReachableNodes";
import { resolveVariables } from "./utils/resolveVariables";
import { getEdgeMap, mapOutputToInput } from "./utils/utils";

const logger = pino();

/**
 * This function updates the input state of a node and executes the node with the new input.
 * Read all target nodes and update their input state. Repeat until there are no more data target nodes.
 * Nodes that are run on execution are run separately.
 *
 * @param flow
 * @param nodeId
 * @param input
 * @param runOptions
 * @returns
 */
export async function runFlow(flow: Flow, nodeId: string, input: Record<string, ParamValue>, runOptions?: RunOptions) {
  logger.level = runOptions?.logLevel || "error";

  const newState = { ...flow.state };

  // track nodes that are reachable from the current node
  const reachableNodes = getReachableNodes(nodeId, flow.definition);

  // avoid hanging on loops by keeping track of the edges that have been visited
  const visitedEdges: string[] = [];
  // track the number of times a node has been run
  const runs: Record<string, number> = {};

  const run_flow_recursive = async (nodeId: string, input: Record<string, ParamValue>) => {
    const previousState = { ...newState[nodeId] };
    const nodeConfig = flow.definition.nodes[nodeId];
    const node = flow.nodeTypes[nodeConfig?.type];

    // update node state with the input values
    const updatedFlow = { ...flow, state: newState };
    const newNodeState = await updateNodeInput(updatedFlow, nodeId, input, runOptions);
    newState[nodeId] = { ...newNodeState };
    logger.debug({ nodeId, input, newState: newState[nodeId] }, "Updated node input");

    const targets = Object.values(flow.definition.edges).filter((edge) => edge.source === nodeId);

    // guard against infinite loops
    const isAlreadyRun = (runs[nodeId] || 0) > 0;

    if (isAlreadyRun) {
      logger.debug({ nodeId }, "Node already run");
      return;
    }

    // break execution if there are no targets
    if (targets.length === 0) {
      logger.debug("No targets found");
      return;
    }

    // if the node is executable, only run it if the parent is complete
    const parentNodeId = Object.values(flow.definition.edges).find(
      (e) => e.target === nodeId && e.targetHandle.startsWith(executionPrefix)
    )?.source;
    const isParentComplete = parentNodeId ? runs[parentNodeId] > 0 : true;
    const isExecutableNode = !!node.execution?.inputs.length;

    if (!isParentComplete && isExecutableNode) {
      logger.debug("Parent node is not complete, skip execution");
      return;
    }

    // resolve variables to use during the run
    const newInput = newState[nodeId]?.input;
    let resolvedInput: Record<string, ParamValue> = {};
    try {
      logger.debug("Resolving node variables");
      resolvedInput = await resolveVariables(newInput, runOptions?.resolveReferences || (async (i) => i));
    } catch (error) {
      logger.error({ error, nodeId }, "Error resolving variables");
      runOptions?.onNodeRunError?.(nodeId, error as Error);
      return;
    }

    const execute = node.execute || identity;
    const getTargets = node.getTargets || getDefaultTargets(node);

    // run the node
    let result: Record<string, ParamValue> | null = null;
    try {
      // resolve references in the input
      const nodeOptions = { prevInput: previousState.input, globals: runOptions?.globals || {} };
      result = await execute(resolvedInput, nodeOptions);
      runOptions?.onNodeRunComplete?.(nodeId, result);
      logger.debug({ nodeId, result }, "Node run complete");
      // track the run
      runs[nodeId] = runs[nodeId] ? runs[nodeId] + 1 : 1;
      // break the chain if the node returns null
      if (result === null) return;
    } catch (error) {
      logger.error({ error, nodeId }, "Error running node");
      // if running the node fails, stop the chain
      runOptions?.onNodeRunError?.(nodeId, error as Error);
      return;
    }

    // ignore target nodes that are not connected to the values that have been edited
    const editedKeys = Object.keys(result);
    const dataTargetIds = targets.filter((e) => editedKeys.includes(e.sourceHandle)).map((e) => e.target);
    logger.debug({ nodeId, dataTargetIds }, "Data targets");

    // update the input of all target nodes
    for (const targetNodeId of dataTargetIds) {
      // data edges between this node and the target node
      const dataEdges = Object.values(flow.definition.edges).filter(
        (e) => e.source === nodeId && e.target === targetNodeId && !e.sourceHandle.startsWith(executionPrefix)
      );
      const edgeMap = getEdgeMap(dataEdges);
      const mappedInput = mapOutputToInput(result, edgeMap);

      // append to visited edges
      visitedEdges.push(...dataEdges.map((e) => e.id));

      // only run the node if all incoming edges have been resolved and ignore parents that are not reachable
      const incomingEdges = Object.values(flow.definition.edges).filter(
        (e) => e.target === targetNodeId && reachableNodes.has(e.source)
      );

      const areIncomingEdgesVisited = incomingEdges.every((e) => visitedEdges.includes(e.id));
      const targetConfig = flow.definition.nodes[targetNodeId];
      const targetDefinition = flow.nodeTypes[targetConfig?.type];
      const targetIsExecutable = !!targetDefinition?.execution?.inputs?.length;
      const shouldRunTarget = areIncomingEdgesVisited && !targetIsExecutable;

      if (shouldRunTarget) {
        logger.debug({ nodeId, targetNodeId, mappedInput }, "Running target node");
        await run_flow_recursive(targetNodeId, mappedInput);
      } else {
        logger.debug({ nodeId, targetNodeId, mappedInput }, "Updating target node inputs");
        const newNodeState = await updateNodeInput(updatedFlow, targetNodeId, mappedInput, runOptions);
        newState[targetNodeId] = { ...newNodeState };
      }
    }

    // run the execution target
    if (runOptions?.mode === "dataflow") return;

    // define the execution order
    const executionOrder = await getTargets(resolvedInput, result, { prevInput: previousState.input });
    const executionTargets = targets.filter(
      (edge) => edge.sourceHandle.startsWith(executionPrefix) && edge.source === nodeId
    );

    logger.debug({ executions: executionOrder }, "Execution Order");

    for (const execution of executionOrder) {
      visitedEdges.push(...executionTargets.map((e) => e.id));
      const targetId = executionTargets.find((e) => e.sourceHandle === execution.execSource)?.target;

      if (targetId) {
        // override the infinite loop guard
        runs[targetId] = runs[targetId] ? runs[targetId] - 1 : 0;

        // data edges between this node and the target node
        const dataEdges = Object.values(flow.definition.edges).filter(
          (e) => e.source === nodeId && e.target === targetId && !e.sourceHandle.startsWith(executionPrefix)
        );

        const edgeMap = getEdgeMap(dataEdges);
        const mappedInput = edgeMap ? mapOutputToInput(execution.inputs, edgeMap) : {};

        logger.debug({ nodeId, targetId, mappedInput }, "Running executable node");
        await run_flow_recursive(targetId, mappedInput);
      } else {
        logger.debug({ executionTargets, executionSource: execution.execSource }, "No target found for source");
      }
    }
  };

  await run_flow_recursive(nodeId, input);
  return newState;
}
