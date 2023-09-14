import { NodeConfig, Param, ParamValue } from "@pufflig/ps-types";
import { FlowEdge } from "../../../types";

/**
 * Create a record of the default values for a list of parameters
 * @param params parameter configuration
 * @returns record of the default values
 */
export function paramToDefaults(params: Param[]) {
  const defaults: Record<string, ParamValue> = {};
  for (const param of params) {
    defaults[param.id] = param.defaultValue;
  }
  return defaults;
}

/**
 * Apply default values to the node State
 * @param nodeStateData existing node state
 * @param node node configuration
 * @returns node state with default values
 */
export function applyDefaultInputs(nodeStateData: Record<string, ParamValue> | undefined, node: NodeConfig) {
  const inputs = [...node.inputs];
  const defaults = paramToDefaults(inputs);
  return { ...defaults, ...(nodeStateData || {}) };
}

/**
 * Create a record of corresponding source and target handles
 * @param edges chain edges
 * @returns record of source and target handles
 */
export function getEdgeMap(edges: FlowEdge[]): Record<string, string[]> {
  const res: Record<string, string[]> = {};
  for (const e of edges) {
    if (!res[e.sourceHandle]) {
      res[e.sourceHandle] = [e.targetHandle];
    } else {
      res[e.sourceHandle].push(e.targetHandle);
    }
  }
  return res;
}

/**
 * Map the output of a node to the input of the next node
 * @param output
 * @param map
 * @returns
 */
export function mapOutputToInput(output: Record<string, ParamValue>, map: Record<string, string[]>) {
  const res: Record<string, ParamValue> = {};
  for (const [key, value] of Object.entries(map)) {
    value.forEach((v) => {
      // if a value is not part of the output, do not map it
      if (output[key] !== undefined) {
        // assign the output value to the input at the target key
        res[v] = output[key];
      }
    });
  }
  return res;
}
