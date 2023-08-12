import { Chat, ChatMessage, ModelConfig, Node } from "@pufflig/ps-types";
import { Configuration, OpenAIApi } from "openai";
import { nodes } from "@pufflig/ps-nodes-config";

export const nodeType = "adapter/openai_chat" as const;

export interface OpenAIChatInput {
  api_key: string;
  chat: Chat;
  model: ModelConfig;
}

export interface OpenAIChatOutput {
  message: ChatMessage;
}

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

export const openaiChat: Node<OpenAIChatInput, OpenAIChatOutput> = {
  ...nodes[nodeType],
  execute,
  parseInput: async (i) => i,
};
