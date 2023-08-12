import { nodes } from "@pufflig/ps-nodes-config";
import { Node } from "@pufflig/ps-types";

export const customApiChatNodeType = "adapter/custom_api_chat" as const;

// PLACEHOLDER

interface CustomAPIChatInput {}

interface CustomAPIChatOutput {}

export const customApiChat: Node<CustomAPIChatInput, CustomAPIChatOutput> = {
  ...nodes[customApiChatNodeType],
  execute: async (i) => i,
  parseInput: async (i) => i,
};
