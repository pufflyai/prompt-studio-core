import { HandlebarTemplateChatInput, HandlebarTemplateChatOutput } from "@pufflig/ps-nodes-config";
import Mustache from "mustache";
import { objectDefinitionToMap } from "../utils/objectDefinitionToMap";

export const execute = async (input: HandlebarTemplateChatInput): Promise<HandlebarTemplateChatOutput> => {
  const { chat, variables } = input;
  const variablesObject = objectDefinitionToMap(variables);

  const renderedMessages = chat.messages.map((message) => {
    const renderedTemplate = Mustache.render(message.content, variablesObject);
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

export const handlebarTemplateChat = {
  execute,
};
