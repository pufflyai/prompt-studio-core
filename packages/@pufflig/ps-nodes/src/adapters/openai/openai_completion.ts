import { OPENAI_API_KEY } from "@pufflig/ps-models";
import { nodes } from "@pufflig/ps-nodes-config";
import { Execute, ModelValue, Node, ParamValueMap } from "@pufflig/ps-types";
import { Configuration, OpenAIApi } from "openai";

export const openaiCompletionNodeType = "adapter/openai_completion" as const;

export interface OpenAICompletionInput {
  prompt: string;
  model: ModelValue;
}

export interface OpenAICompletionOutput extends ParamValueMap {
  completion: string;
}

export const execute: Execute<OpenAICompletionInput> = async (input, options = {}) => {
  const { prompt, model } = input;
  const { modelId, parameters } = model;
  const { globals } = options;

  const configuration = new Configuration({ apiKey: globals?.[OPENAI_API_KEY] });
  const openai = new OpenAIApi(configuration);

  const params = { ...parameters, model: modelId };
  const completion = await openai.createCompletion({ prompt, ...params });

  const completionText = completion.data.choices[0].text || "";

  return {
    completion: completionText,
  };
};

export const openaiCompletion: Node<OpenAICompletionInput, OpenAICompletionOutput> = {
  ...nodes[openaiCompletionNodeType],
  execute,
};
