import { NextNode, Node, ParamValueMap } from "@pufflig/ps-types";

export const delimiterStart = "${{ps:ref:" as const;
export const delimiterEnd = "}}" as const;
export const executionPrefix = "exec:";

export const identity = (i: ParamValueMap, _: Partial<ParamValueMap>) => i;
export const getDefaultTargets =
  (node: Node) => (_input: ParamValueMap, _prev: ParamValueMap, results: ParamValueMap) => {
    if (!node.execution?.outputs?.[0]?.id) return [];
    return [
      {
        execSource: node.execution.outputs[0].id,
        inputs: results,
      } as NextNode,
    ];
  };
