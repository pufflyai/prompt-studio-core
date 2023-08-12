import { nodes } from "@pufflig/ps-nodes-config";
import { Node } from "@pufflig/ps-types";

export const customApiCompletionNodeType = "adapter/custom_api_completion" as const;

// PLACEHOLDER

interface CustomAPICompletionInput {}

interface CustomAPICompletionOutput {}

export const customApiCompletion: Node<CustomAPICompletionInput, CustomAPICompletionOutput> = {
  ...nodes[customApiCompletionNodeType],
  execute: async (i) => i,
  parseInput: async (i) => i,
};
