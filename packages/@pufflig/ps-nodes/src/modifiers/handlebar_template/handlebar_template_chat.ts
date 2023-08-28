import _ from "lodash";
import { Chat, Node, NumberParam, ObjectDefinition, TextParam } from "@pufflig/ps-types";
import Mustache from "mustache";
import { objectDefinitionToMap } from "../../utils/objectDefinitionToMap";
import { extractVariables } from "./utils/extractVariables";
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

/**
 * Parse the input and extract variables from the template.
 * If no template is provided, the input is returned as is.
 * @param input
 * @param prev
 * @returns
 */
export const parseInput = async (
  input: HandlebarTemplateChatInput,
  prev?: Partial<HandlebarTemplateChatInput>
) => {
  const { chat, variables } = input;

  if (chat === undefined) {
    return input;
  }
  const extractedVariableArrays = chat.messages.map((message) => {
    var messageVars = extractVariables(message.content)
    return messageVars
  })

  const extractedVariables = _.flatten(extractedVariableArrays)

  const uniqueVariables = extractedVariables.reduce((uniqueArr: (NumberParam | TextParam | null)[], currentVariable: NumberParam | TextParam | null) => {
    const existingVariable = uniqueArr.find(variable => variable?.id === currentVariable?.id);
    if (!existingVariable) {
      uniqueArr.push(currentVariable);
    }
    return uniqueArr;
  }, []);


  if (uniqueVariables) {
    // extracted variables that already existed in the previous input are assigned the previous value
    const variablesObject = uniqueVariables.map((variable) => {
      const prevVariable = (prev?.variables || []).find((v) => v.id === variable?.id);
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

export const handlebarTemplateChat: Node = {
  ...nodes[handlebarTemplateChatNodeType],
  execute,
  parseInput: async (i) => i,
};
