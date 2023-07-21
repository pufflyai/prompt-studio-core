import { Configuration, OpenAIApi } from "openai";
import { AdapterSettings } from "../../types";
import { ChatNodeIO } from "@pufflig/ps-types";

export async function createChatCompletion(input: ChatNodeIO, options: AdapterSettings): Promise<ChatNodeIO> {
  const { model, settings } = options;
  const { modelId, parameters } = model;
  const { apiKey } = settings;
  const { messages } = input;

  // this might slowdown the response time
  const configuration = new Configuration({ apiKey: apiKey as string });
  const openai = new OpenAIApi(configuration);
  // --

  const params = { ...parameters, model: modelId };
  const completion = await openai.createChatCompletion({ ...params, messages });
  const chatCompletion = completion.data.choices[0].message;

  return {
    messages: [
      ...messages,
      {
        content: chatCompletion?.content || "",
        role: chatCompletion?.role || "user",
      },
    ],
  };
}
