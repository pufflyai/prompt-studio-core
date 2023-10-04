import { nodeTypes, nodes } from "@pufflig/ps-nodes-config";
import { MapInput, Node, ObjectDefinition, Param } from "@pufflig/ps-types";
import Mustache from "mustache";
import { extractVariables } from "./utils/extractVariables";

export interface TemplateTextInput {
  template: string;
  [key: string]: string;
}

export interface TemplateTextOutput {
  text: string;
}

export const objectDefinitionToMap = (definition: ObjectDefinition) => {
  const map = {} as Record<string, string | number>;
  definition.forEach((item) => {
    map[item.id] = item.defaultValue;
  });
  return map;
};

export const execute = async (input: TemplateTextInput) => {
  const { template, ...variables } = input;
  const renderedTemplate = Mustache.render(template, variables);
  return {
    text: renderedTemplate,
  };
};

/**
 * Returns a new input definition given variables extracted from the template.
 *
 * @param input
 * @param prev
 * @returns
 */
export const mapInput: MapInput<TemplateTextInput> = async (input) => {
  const { template, ...rest } = input;

  if (template === undefined) {
    return nodes[nodeTypes.templateTextNodeTypeV2].inputs;
  }

  const definitionsWithDefaults = nodes[nodeTypes.templateTextNodeTypeV2].inputs.map((input) => {
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

export const templateTextV2: Node<TemplateTextInput, TemplateTextOutput> = {
  ...nodes[nodeTypes.templateTextNodeTypeV2],
  execute,
  mapInput,
};
