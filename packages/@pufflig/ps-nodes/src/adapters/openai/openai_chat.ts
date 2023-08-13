import { Chat, ChatMessage, ModelConfig, Node } from "@pufflig/ps-types";
import { Configuration, OpenAIApi, ChatCompletionRequestMessage } from "openai";
import { nodes } from "@pufflig/ps-nodes-config";
import { v4 as uuid } from "uuid";

export const openaiChatNodeType = "adapter/openai_chat" as const;

export interface OpenAIChatInput {
  api_key: string;
  chat: Chat;
  model: ModelConfig;
}

export interface OpenAIChatOutput {
  message: ChatMessage;
}

const mapMessage = (message: ChatMessage): ChatCompletionRequestMessage => {
  return {
    role: message.role,
    content: message.content,
    name: message.name,
    // TODO: add function calls
  };
};

export const execute = async (input: OpenAIChatInput): Promise<OpenAIChatOutput> => {
  const { chat, model, api_key } = input;
  const { modelId, parameters } = model;

  const configuration = new Configuration({ apiKey: api_key });
  const openai = new OpenAIApi(configuration);

  const params = { ...parameters, model: modelId };
  const mappedMessages = (chat?.messages || []).map(mapMessage);
  const completion = await openai.createChatCompletion({ ...params, messages: mappedMessages });
  const chatCompletion = completion.data.choices[0].message;

  return {
    message: {
      id: uuid(),
      createdAt: new Date().toISOString(),
      content: chatCompletion?.content || "",
      role: chatCompletion?.role || "user",
    },
  };
};

export const openaiChat: Node<OpenAIChatInput, OpenAIChatOutput> = {
  ...nodes[openaiChatNodeType],
  execute,
  parseInput: async (i) => i,
};
