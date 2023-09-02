import { nodes } from "@pufflig/ps-nodes-config";
import { Chat, Node } from "@pufflig/ps-types";

export const customApiChatNodeType = "adapter/custom_api_chat" as const;

// PLACEHOLDER

export interface CustomAPIChatInput {
  chat: Chat;
}

export interface CustomAPIChatOutput {
  chat: Chat;
}

export const customApiChat: Node = {
  ...nodes[customApiChatNodeType],
  execute: async () => {
    return {
      chat: { messages: [] },
    };
  },
};
