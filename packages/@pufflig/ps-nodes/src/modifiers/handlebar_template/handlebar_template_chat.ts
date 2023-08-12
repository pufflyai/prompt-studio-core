import { Chat, Node, ObjectDefinition } from "@pufflig/ps-types";
import Mustache from "mustache";
import { objectDefinitionToMap } from "../../utils/objectDefinitionToMap";
import { nodes } from "@pufflig/ps-nodes-config";

export const handlebarTemplateChatNodeType = "modifier/handlebar_template_chat";

export interface HandlebarTemplateChatInput {
  chat: Chat;
  variables: ObjectDefinition;
}

export interface HandlebarTemplateChatOutput {
  chat: Chat;
}

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

export const handlebarTemplateChat: Node<HandlebarTemplateChatInput, HandlebarTemplateChatOutput> = {
  ...nodes[handlebarTemplateChatNodeType],
  execute,
  parseInput: async (i) => i,
};
