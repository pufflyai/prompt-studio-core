import { nodeTypes, nodes } from "@pufflig/ps-nodes-config";
import { Chat, MapInput, Node, ObjectDefinition, Param } from "@pufflig/ps-types";
import _ from "lodash";
import Mustache from "mustache";
import { extractVariables } from "../../utils/extractVariables";
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

/**
 * Parse the input and extract variables from the template.
 * If no template is provided, the input is returned as is.
 * @param input
 * @param prev
 * @returns
 */
export const mapInput: MapInput<TemplateChatInput> = async (input, options = {}) => {
  const { chat, variables } = input;
  const { prevInput } = options;

  if (chat === undefined) {
    return input;
  }
  const extractedVariableArrays = chat.messages.map((message) => {
    var messageVars = extractVariables(message.content);
    return messageVars;
  });

  const extractedVariables = _.flatten(extractedVariableArrays);

  const uniqueVariables = extractedVariables.reduce((uniqueArr: (Param | null)[], currentVariable: Param | null) => {
    const existingVariable = uniqueArr.find((variable) => variable?.id === currentVariable?.id);
    if (!existingVariable) {
      uniqueArr.push(currentVariable);
    }
    return uniqueArr;
  }, []);

  if (uniqueVariables) {
    // extracted variables that already existed in the previous input are assigned the previous value
    const variablesObject = uniqueVariables.map((variable) => {
      const prevVariable = (prevInput?.variables || []).find((v) => v.id === variable?.id);
      if (prevVariable) {
        return {
          ...variable,
          defaultValue: prevVariable.defaultValue,
        };
      }
      return variable;
    });

    const newVariables = _.unionBy(_.intersectionBy(variables, variablesObject, "id"), variablesObject as any, "id");

    return {
      ...input,
      variables: newVariables,
    };
  }

  return {
    ...input,
    variables,
  };
};

export const templateChat: Node<TemplateChatInput, templateChatOutput> = {
  ...nodes[nodeTypes.templateChatNodeType],
  execute,
  mapInput,
};
