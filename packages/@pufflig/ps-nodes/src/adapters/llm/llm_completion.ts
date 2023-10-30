import { nodes, nodeTypes } from "@pufflig/ps-nodes-config";
import { createCompletion } from "@pufflig/ps-sdk";
import { Execute, GetInputDefinition, ModelValue, Node, Param } from "@pufflig/ps-types";
import { getPromptStudioKey } from "../../utils/getPromptStudioKey";
import { extractVariables } from "../../utils/extractVariables";

export interface LLMCompletionInput {
  prompt: string;
  model: ModelValue;
  [key: string]: any;
}

export interface LLMCompletionOutput {
  completion: string;
}

export const execute: Execute<LLMCompletionInput, LLMCompletionOutput> = async (input, options = {}) => {
  const { prompt, model } = input;
  const { modelId, parameters } = model;
  const { globals } = options;

  const result = await createCompletion({
    apiKey: getPromptStudioKey(globals || {}),
    modelId,
    prompt,
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
  const { prompt, ...rest } = input;

  if (prompt === undefined) {
    return nodes[nodeTypes.llmCompletionNodeType].inputs;
  }

  const definitionsWithDefaults = nodes[nodeTypes.llmCompletionNodeType].inputs.map((input) => {
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

export const llmCompletion: Node<LLMCompletionInput, LLMCompletionOutput> = {
  ...nodes[nodeTypes.llmCompletionNodeType],
  execute,
  getInputDefinition,
};
