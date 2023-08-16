import { nodes } from "@pufflig/ps-nodes-config";
import { Node } from "@pufflig/ps-types";

export const messageNodeType = "data/message" as const;

export const messageNode: Node = {
  ...nodes[messageNodeType],
  execute: async (i) => i,
  parseInput: async (i) => i,
};
