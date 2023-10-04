import { nodeTypes, nodes } from "@pufflig/ps-nodes-config";
import { GetInputDefinition, Node, Param } from "@pufflig/ps-types";
import Mustache from "mustache";
import { extractVariables } from "../../utils/extractVariables";

export interface TemplateTextInput {
  template: string;
  [key: string]: string;
}

export interface TemplateTextOutput {
  prompt: string;
}

export const execute = async (input: TemplateTextInput) => {
  const { template, ...variables } = input;
  const renderedTemplate = Mustache.render(template, variables);
  return {
    prompt: renderedTemplate,
  };
};

/**
 * Returns a new input definition given variables extracted from the template.
 *
 * @param input
 * @param prev
 * @returns
 */
export const getInputDefinition: GetInputDefinition<TemplateTextInput> = (input) => {
  const { template, ...rest } = input;

  if (template === undefined) {
    return nodes[nodeTypes.promptNodeType].inputs;
  }

  const definitionsWithDefaults = nodes[nodeTypes.promptNodeType].inputs.map((input) => {
    if (input.id === "template") {
      return {
        ...input,
        defaultValue: template,
      } as Param;
    }
    return input;
  });

  const extractedVariables = extractVariables(template);

  if (extractedVariables) {
    const extractedVariablesWithDefaults = extractedVariables.map((variable) => {
      return {
        ...variable,
        defaultValue: rest[variable.id] || "",
      } as Param;
    });

    return [...definitionsWithDefaults, ...extractedVariablesWithDefaults];
  }

  return definitionsWithDefaults;
};

export const promptNode: Node<TemplateTextInput, TemplateTextOutput> = {
  ...nodes[nodeTypes.promptNodeType],
  execute,
  getInputDefinition,
};
