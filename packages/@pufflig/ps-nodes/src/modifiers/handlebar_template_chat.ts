import { HandlebarTemplateChatInput, HandlebarTemplateChatOutput } from "@pufflig/ps-nodes-config";
import Mustache from "mustache";

export const runHandlebarTemplateChat = async (
  input: HandlebarTemplateChatInput
): Promise<HandlebarTemplateChatOutput> => {
  const { chat, variables } = input;

  const renderedMessages = chat.messages.map((message) => {
    const renderedTemplate = Mustache.render(message.content, variables);
    return {
      ...message,
      content: renderedTemplate,
    };
  });

  return {
    chat: {
      messages: renderedMessages,
    },
  };
};
