import { ChatNodeIO } from "@pufflig/ps-types";
import { ModifierSettings } from "../../types";
import Mustache from "mustache";

export const modifyChat = async (input: ChatNodeIO, settings: ModifierSettings): Promise<ChatNodeIO> => {
  const { messages } = input;
  const { variables } = settings;

  const renderedMessages = messages.map((message) => {
    const renderedTemplate = Mustache.render(message.content, variables);
    return {
      ...message,
      content: renderedTemplate,
    };
  });

  return {
    messages: renderedMessages,
  };
};
