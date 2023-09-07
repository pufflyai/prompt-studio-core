import { Execute, GetTargets, NextNode, Node, ParamValueMap } from "@pufflig/ps-types";

export const delimiterStart = "${{ps:ref:" as const;
export const delimiterEnd = "}}" as const;
export const executionPrefix = "exec:";

/**
 * Placeholder function for executing a node.
 * Simply returns the nodes inputs.
 * @param input
 * @param _
 * @returns
 */
export const identity: Execute<ParamValueMap> = async (input, _) => input;

/**
 * Given a node, returns the default targets for the node.
 * The default target is the first executable output.
 * @param node
 * @returns
 */
export const getDefaultTargets =
  (node: Node): GetTargets<ParamValueMap> =>
  async (_, results) => {
    if (!node.execution?.outputs?.[0]?.id) return [];
    return [
      {
        execSource: node.execution.outputs[0].id,
        inputs: results,
      } as NextNode,
    ];
  };
