import { nodes } from "@pufflig/ps-nodes-config";
import { Node } from "@pufflig/ps-types";

export const outputNodeType = "core/output" as const;

export const outputNode: Node = {
  ...nodes[outputNodeType],
  execute: async (i) => i,
  parseInput: async (i) => i,
};
