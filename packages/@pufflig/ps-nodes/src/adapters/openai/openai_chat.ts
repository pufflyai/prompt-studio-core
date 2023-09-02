import { nodes } from "@pufflig/ps-nodes-config";
import { Chat, ChatMessage, ModelValue, Node, ParamValueMap } from "@pufflig/ps-types";
import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from "openai";
import { v4 as uuid } from "uuid";

export const openaiChatNodeType = "adapter/openai_chat" as const;

export interface OpenAIChatInput extends ParamValueMap {
  api_key: string;
  chat: Chat;
  model: ModelValue;
}

export interface OpenAIChatOutput extends ParamValueMap {
  message: ChatMessage;
}

export const execute = async (input: OpenAIChatInput) => {
  const { chat, model, api_key } = input;
  const { modelId, parameters } = model;

  const configuration = new Configuration({ apiKey: api_key });
  const openai = new OpenAIApi(configuration);

  const params = { ...parameters, model: modelId };
  const messages: ChatCompletionRequestMessage[] = (chat?.messages || []).map((m) => ({
    content: m.content,
    role: m.role,
  }));
  const completion = await openai.createChatCompletion({ ...params, messages, functions: chat.functions });
  const chatCompletion = completion.data.choices[0].message;

  return {
    message: {
      id: uuid(),
      provider: "openai",
      model,
      createdAt: new Date().toISOString(),
      content: chatCompletion?.content || "",
      role: chatCompletion?.role || "user",
    },
  };
};

export const openaiChat: Node<OpenAIChatInput, OpenAIChatOutput> = {
  ...nodes[openaiChatNodeType],
  execute,
};
