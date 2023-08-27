import { nodes, nodeTypes } from "@pufflig/ps-nodes-config";
import { Node } from "@pufflig/ps-types";

export const textNode: Node = {
  ...nodes[nodeTypes.textNodeType],
  execute: async (i) => i,
  parseInput: async (i) => i,
};
