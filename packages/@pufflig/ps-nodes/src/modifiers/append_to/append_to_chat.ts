import { nodes } from "@pufflig/ps-nodes-config";
import { Chat, ChatMessage, Node } from "@pufflig/ps-types";

export const appendToChatNodeType = "modifier/append_to_chat";

export interface AppendToChatInput {
  chat: Chat;
  message: ChatMessage | null;
  messageId: string;
}

export interface AppendToChatOutput {
  chat: Chat;
}

export const execute = async (
  input: AppendToChatInput,
  prevInput?: AppendToChatInput
): Promise<AppendToChatOutput | null> => {
  // if there is no message, return the chat without change
  if (!input.message) {
    return {
      chat: input.chat,
    };
  }

  // if the message has not changed, return the chat without change
  if (prevInput?.message?.id === input.message?.id) {
    return {
      chat: input.chat,
    };
  }

  const { chat, message, messageId } = input;

  const messageIndex = chat.messages.findIndex((m) => m.id === messageId);

  // add message as new version
  if (messageIndex !== -1) {
    const messageToVersion = chat.messages[messageIndex];
    messageToVersion.versions ||= [];
    messageToVersion.versions.push(message);
    return {
      chat,
    };
  }

  chat.messages.push(message);

  return {
    chat,
  };
};

export const appendToChat: Node<AppendToChatInput, AppendToChatOutput | null> = {
  ...nodes[appendToChatNodeType],
  execute,
  parseInput: async (i) => i,
};
