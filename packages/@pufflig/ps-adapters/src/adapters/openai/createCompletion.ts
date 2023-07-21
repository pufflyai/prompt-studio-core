import { Configuration, OpenAIApi } from "openai";
import { AdapterSettings } from "../../types";
import { CompletionNodeIO } from "@pufflig/ps-types";

export async function createCompletion(input: CompletionNodeIO, options: AdapterSettings): Promise<CompletionNodeIO> {
  const { prompt } = input;
  const { model, settings } = options;
  const { modelId, parameters } = model;
  const { apiKey } = settings;

  // this might slowdown the response time
  const configuration = new Configuration({ apiKey: apiKey as string });
  const openai = new OpenAIApi(configuration);
  // --

  const params = { ...parameters, model: modelId };
  const completion = await openai.createCompletion({ prompt, ...params });

  // NOTE: CompletionNodeOutput could be extended to contain more information
  const completionText = completion.data.choices[0].text || "";

  return {
    prompt,
    completion: completionText,
  };
}
