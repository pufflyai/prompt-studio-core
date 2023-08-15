import { nodes } from "@pufflig/ps-nodes-config";
import { Node } from "@pufflig/ps-types";

export const inputNodeType = "core/input" as const;

export const inputNode: Node = {
  ...nodes[inputNodeType],
  execute: async (i) => i,
  parseInput: async (i) => i,
};
