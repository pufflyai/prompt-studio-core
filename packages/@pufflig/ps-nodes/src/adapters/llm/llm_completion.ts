import { nodes, nodeTypes } from "@pufflig/ps-nodes-config";
import { createCompletion } from "@pufflig/ps-sdk";
import { Execute, GetInputDefinition, ModelValue, Node, Param } from "@pufflig/ps-types";
import { getPromptStudioKey } from "../../utils/getPromptStudioKey";
import { extractVariables } from "../../utils/extractVariables";
import Mustache from "mustache";

export interface LLMCompletionInput {
  prompt: string;
  model: ModelValue;
  [key: string]: any;
}

export interface LLMCompletionOutput {
  completion: string;
}

export const execute: Execute<LLMCompletionInput, LLMCompletionOutput> = async (input, options = {}) => {
  const { prompt, model, ...variables } = input;
  const { modelId, parameters } = model;
  const { globals } = options;

  const renderedTemplate = Mustache.render(prompt, variables);

  const result = await createCompletion({
    apiKey: getPromptStudioKey(globals || {}),
    modelId,
    prompt: renderedTemplate,
    parameters,
    config: globals,
    options: {
      cache: true,
      track: true,
    },
  });

  return {
    completion: result?.datapoint?.model_output || "",
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
  const { prompt, model, ...rest } = input;

  if (prompt === undefined) {
    return nodes[nodeTypes.llmCompletionNodeType].inputs;
  }

  const defaults = { prompt, model };

  const definitionsWithDefaults = nodes[nodeTypes.llmCompletionNodeType].inputs.map((input) => {
    if (Object.keys(defaults).includes(input.id)) {
      return {
        ...input,
        defaultValue: defaults[input.id as keyof typeof defaults],
      } as Param;
    }
    return input;
  });

  const extractedVariables = extractVariables(prompt);

  if (extractedVariables) {
    const extractedVariablesWithDefaults = extractedVariables
      .filter((param) => {
        return !Object.keys(defaults).includes(param.id);
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

export const llmCompletion: Node<LLMCompletionInput, LLMCompletionOutput> = {
  ...nodes[nodeTypes.llmCompletionNodeType],
  execute,
  getInputDefinition,
};
