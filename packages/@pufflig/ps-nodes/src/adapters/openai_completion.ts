import { OpenAICompletionInput, OpenAICompletionOutput } from "@pufflig/ps-nodes-config";
import { Configuration, OpenAIApi } from "openai";

export const runOpenAiCompletion = async (input: OpenAICompletionInput): Promise<OpenAICompletionOutput> => {
  const { prompt, model, api_key } = input;
  const { modelId, parameters } = model;

  const configuration = new Configuration({ apiKey: api_key });
  const openai = new OpenAIApi(configuration);

  const params = { ...parameters, model: modelId };
  const completion = await openai.createCompletion({ prompt, ...params });

  const completionText = completion.data.choices[0].text || "";

  return {
    completion: completionText,
  };
};
