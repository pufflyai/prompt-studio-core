import { nodeTypes, nodes } from "@pufflig/ps-nodes-config";
import { MapInput, Node, ObjectDefinition } from "@pufflig/ps-types";
import _ from "lodash";
import Mustache from "mustache";
import { objectDefinitionToMap } from "../../utils/objectDefinitionToMap";
import { extractVariables } from "./utils/extractVariables";

export interface TemplateTextInput {
  template: string;
  variables: ObjectDefinition;
}

export interface TemplateTextOutput {
  text: string;
}

export const execute = async (input: TemplateTextInput) => {
  const { template, variables } = input;
  const variablesObject = objectDefinitionToMap(variables);
  const renderedTemplate = Mustache.render(template, variablesObject);
  return {
    text: renderedTemplate,
  };
};

/**
 * Parse the input and extract variables from the template.
 * If no template is provided, the input is returned as is.
 * @param input
 * @param prev
 * @returns
 */
export const mapInput: MapInput<TemplateTextInput> = async (input, options = {}) => {
  const { template, variables } = input;
  const { prevInput } = options;

  if (template === undefined) {
    return input;
  }

  const extractedVariables = extractVariables(template);

  if (extractedVariables) {
    // extracted variables that already existed in the previous input are assigned the previous value
    const variablesObject = extractedVariables.map((variable) => {
      const prevVariable = (prevInput?.variables || []).find((v) => v.id === variable.id);
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

export const templateText: Node<TemplateTextInput, TemplateTextOutput> = {
  ...nodes[nodeTypes.templateTextNodeType],
  execute,
  mapInput,
};
