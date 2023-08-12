import { nodes } from "@pufflig/ps-nodes-config";
import { Node } from "@pufflig/ps-types";

export const customApiCompletionNodeType = "adapter/custom_api_completion" as const;

// PLACEHOLDER

export interface CustomAPICompletionInput {
  prompt: string;
}

export interface CustomAPICompletionOutput {
  completion: string;
}

export const customApiCompletion: Node<CustomAPICompletionInput, CustomAPICompletionOutput> = {
  ...nodes[customApiCompletionNodeType],
  execute: async (i) => {
    return {
      completion: i.prompt,
    };
  },
  parseInput: async (i) => i,
};
