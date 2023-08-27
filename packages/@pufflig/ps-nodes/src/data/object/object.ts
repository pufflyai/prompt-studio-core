import { nodes, nodeTypes } from "@pufflig/ps-nodes-config";
import { Node, ParamValue } from "@pufflig/ps-types";
import { getParamType } from "../../utils/getParamType";

/**
 * Currently the object node only maps text and number inputs
 */
export const objectNode: Node = {
  ...nodes[nodeTypes.objectNodeType],
  execute: async (inputs: { [key: string]: ParamValue }) => {
    const mappedInputs = Object.entries(inputs).map(([key, value]) => ({
      id: key,
      name: key,
      type: getParamType(value),
      defaultValue: value,
      description: "",
    }));
    return {
      object: mappedInputs,
    };
  },
  parseInput: async (i) => i,
};
