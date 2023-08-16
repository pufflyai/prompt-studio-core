import { nodes } from "@pufflig/ps-nodes-config";
import { Node } from "@pufflig/ps-types";

export const textNodeType = "data/text" as const;

export const textNode: Node = {
  ...nodes[textNodeType],
  execute: async (i) => i,
  parseInput: async (i) => i,
};
