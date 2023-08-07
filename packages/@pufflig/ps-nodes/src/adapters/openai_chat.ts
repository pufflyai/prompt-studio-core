import { OpenAIChatInput, OpenAIChatOutput } from "@pufflig/ps-nodes-config";
import { Configuration, OpenAIApi } from "openai";
import { Node } from "../types";

export const execute = async (input: OpenAIChatInput): Promise<OpenAIChatOutput> => {
  const { chat, model, api_key } = input;
  const { modelId, parameters } = model;

  const configuration = new Configuration({ apiKey: api_key });
  const openai = new OpenAIApi(configuration);

  const params = { ...parameters, model: modelId };
  const completion = await openai.createChatCompletion({ ...params, messages: chat?.messages || [] });
  const chatCompletion = completion.data.choices[0].message;

  return {
    message: {
      content: chatCompletion?.content || "",
      role: chatCompletion?.role || "user",
    },
  };
};

export const openaiChat: Node = {
  execute,
  parseInput: (i) => i,
};
