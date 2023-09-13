import { nodeTypes, nodes } from "@pufflig/ps-nodes-config";
import { Chat, ChatMessage, Node } from "@pufflig/ps-types";

export interface AddMessageInput {
  chat: Chat;
  message: ChatMessage | null;
  messageId: string;
}

export interface AddMessageOutput {
  chat: Chat;
}

export const execute = async (input: AddMessageInput): Promise<AddMessageOutput | null> => {
  // if there is no message, return the chat without change
  if (!input.message) {
    return {
      chat: input.chat,
    };
  }

  // if the message already exists, return the chat without change
  const messageIds = input.chat.messages.map((m) => m.id);
  if (messageIds.includes(input.message.id)) {
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

  return {
    chat: {
      ...chat,
      messages: [...chat.messages, message],
    },
  };
};

export const addMessage: Node<AddMessageInput, AddMessageOutput> = {
  ...nodes[nodeTypes.addMessageNodeType],
  execute,
};
