import { nodes, nodeTypes } from "@pufflig/ps-nodes-config";
import { Node, Param, ParamValue } from "@pufflig/ps-types";

const getTypeFromValue = (value: ParamValue): Param["type"] => {
  if (typeof value === "number") {
    return "number";
  }
  if (Array.isArray(value)) {
    return "list";
  }
  return "text";
};

export const objectNode: Node = {
  ...nodes[nodeTypes.objectNodeType],
  execute: async (inputs) => {
    return {
      object: Object.entries(inputs).map(([key, value]) => {
        return {
          id: key,
          name: key,
          type: getTypeFromValue(value as ParamValue),
          defaultValue: value,
          description: "",
        } as Param;
      }),
    };
  },
  parseInput: async (i) => i,
};
