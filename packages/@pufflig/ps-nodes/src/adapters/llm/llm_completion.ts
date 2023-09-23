import { nodes, nodeTypes } from "@pufflig/ps-nodes-config";
import { createCompletion } from "@pufflig/ps-sdk";
import { Execute, ModelValue, Node } from "@pufflig/ps-types";
import { getPromptStudioKey } from "../../utils/getPromptStudioKey";

export interface LLMCompletionInput {
  prompt: string;
  model: ModelValue;
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

export const llmCompletion: Node<LLMCompletionInput, LLMCompletionOutput> = {
  ...nodes[nodeTypes.llmCompletionNodeType],
  execute,
};
