import { nodes, nodeTypes } from "@pufflig/ps-nodes-config";
import { Node } from "@pufflig/ps-types";

export const objectNode: Node = {
  ...nodes[nodeTypes.objectNodeType],
  execute: async (i) => i,
  parseInput: async (i) => i,
};
