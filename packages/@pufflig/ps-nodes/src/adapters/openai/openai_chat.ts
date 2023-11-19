import { nodes } from "@pufflig/ps-nodes-config";
import { OPENAI_API_KEY } from "@pufflig/ps-models";
import { Chat, ChatMessage, Execute, ModelValue, Node, ParamValueMap } from "@pufflig/ps-types";
import OpenAI from "openai";
import { v4 as uuid } from "uuid";

export const openaiChatNodeType = "adapter/openai_chat" as const;

export interface OpenAIChatInput extends ParamValueMap {
  chat: Chat;
  model: ModelValue;
}

export interface OpenAIChatOutput extends ParamValueMap {
  message: ChatMessage;
}

export const execute: Execute<OpenAIChatInput> = async (input, options = {}) => {
  const { chat, model } = input;
  const { modelId, parameters } = model;
  const { globals } = options;
  const openai = new OpenAI({ apiKey: globals?.[OPENAI_API_KEY] });

  const params = { ...parameters, model: modelId };
  const messages: any = (chat?.messages || []).map((m) => ({
    content: m.content,
    role: m.role,
  }));

  const completion = await openai.chat.completions.create({ ...params, messages });
  const chatCompletion = completion.choices[0].message;

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
