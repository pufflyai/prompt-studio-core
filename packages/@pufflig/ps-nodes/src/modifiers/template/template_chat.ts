import { nodeTypes, nodes } from "@pufflig/ps-nodes-config";
import { Chat, Node, ObjectDefinition } from "@pufflig/ps-types";
import Mustache from "mustache";
import { objectDefinitionToMap } from "../../utils/objectDefinitionToMap";

export interface TemplateChatInput {
  chat: Chat;
  variables: ObjectDefinition;
}

export interface templateChatOutput {
  chat: Chat;
}

export const execute = async (input: TemplateChatInput) => {
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

export const templateChat: Node<TemplateChatInput, templateChatOutput> = {
  ...nodes[nodeTypes.templateChatNodeType],
  execute,
};
