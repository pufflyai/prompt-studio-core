import { nodeTypes, nodes } from "@pufflig/ps-nodes-config";
import { refineCompletion } from "@pufflig/ps-sdk";
import { Execute, GetInputDefinition, ModelValue, Node, Param } from "@pufflig/ps-types";
import { getPromptStudioKey } from "../../utils/getPromptStudioKey";
import { extractVariables } from "../../utils/extractVariables";
import Mustache from "mustache";

export interface LLMCompletionInput {
  prompt: string;
  model: ModelValue;
  document: string;
  table: string;
  [key: string]: any;
}

export interface LLMCompletionOutput {
  completion: string;
}

export const execute: Execute<LLMCompletionInput, LLMCompletionOutput> = async (input, options = {}) => {
  const { prompt, model, document, table, ...variables } = input;
  const { modelId, parameters } = model;
  const { globals } = options;

  const renderedPrompt = Mustache.render(prompt, variables);

  const { result } = await refineCompletion({
    apiKey: getPromptStudioKey(globals || {}),
    modelId,
    prompt: renderedPrompt,
    document: document,
    format: table,
    parameters,
    config: globals,
    options: {
      cache: true,
      track: true,
    },
  });

  return {
    completion: result || "",
  };
};

/**
 * Returns a new input definition given variables extracted from the template.
 *
 * @param input
 * @param prev
 * @returns
 */
export const getInputDefinition: GetInputDefinition<LLMCompletionInput> = (input) => {
  const { prompt, ...rest } = input;

  if (prompt === undefined) {
    return nodes[nodeTypes.documentCheckNodeType].inputs;
  }

  const definitionsWithDefaults = nodes[nodeTypes.documentCheckNodeType].inputs.map((input) => {
    if (input.id === "prompt") {
      return {
        ...input,
        defaultValue: prompt,
      } as Param;
    }
    return input;
  });

  const extractedVariables = extractVariables(prompt);

  if (extractedVariables) {
    const extractedVariablesWithDefaults = extractedVariables
      .filter((param) => {
        return ["document", "table"].includes(param.id);
      })
      .map((variable) => {
        return {
          ...variable,
          defaultValue: rest[variable.id] || "",
        } as Param;
      });

    return [...definitionsWithDefaults, ...extractedVariablesWithDefaults];
  }

  return definitionsWithDefaults;
};

export const documentCheck: Node = {
  ...nodes[nodeTypes.documentCheckNodeType],
  execute,
  getInputDefinition,
};
