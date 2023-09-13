import { nodes, nodeTypes } from "@pufflig/ps-nodes-config";
import { Node, NumberParam, Param, ParamValue, TextParam } from "@pufflig/ps-types";

const getTypeFromValue = (value: ParamValue): Param["type"] => {
  if (typeof value === "number") {
    return "number";
  }
  if (Array.isArray(value)) {
    return "list";
  }
  return "text";
};

export const groupNode: Node = {
  ...nodes[nodeTypes.groupNodeType],
  execute: async (inputs) => {
    return {
      group: Object.entries(inputs).map(([key, value]) => {
        return {
          id: key,
          name: key,
          type: getTypeFromValue(value as ParamValue),
          defaultValue: value,
          description: "",
        } as NumberParam | TextParam;
      }),
    };
  },
};
