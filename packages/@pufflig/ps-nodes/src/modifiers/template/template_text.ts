import { nodeTypes, nodes } from "@pufflig/ps-nodes-config";
import { Node, ObjectDefinition } from "@pufflig/ps-types";
import Mustache from "mustache";
import { objectDefinitionToMap } from "../../utils/objectDefinitionToMap";

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

export const templateText: Node<TemplateTextInput, TemplateTextOutput> = {
  ...nodes[nodeTypes.templateTextNodeType],
  execute,
};
