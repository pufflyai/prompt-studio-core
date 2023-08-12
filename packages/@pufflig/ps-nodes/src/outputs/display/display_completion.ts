import { nodes } from "@pufflig/ps-nodes-config";
import { Node } from "@pufflig/ps-types";

export const displayCompletionNodeType = "output/display_completion" as const;

export const displayCompletion: Node = {
  ...nodes[displayCompletionNodeType],
  execute: async (i) => i,
  parseInput: async (i) => i,
};
