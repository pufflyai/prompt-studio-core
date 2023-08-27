import { nodes, nodeTypes } from "@pufflig/ps-nodes-config";
import { Node } from "@pufflig/ps-types";

export const objectNode: Node = {
  ...nodes[nodeTypes.objectNodeType],
  execute: async (inputs) => {
    return {
      object: inputs,
    };
  },
  parseInput: async (i) => i,
};
