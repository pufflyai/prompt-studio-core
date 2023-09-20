import { openai, OPENAI_API_KEY } from "@pufflig/ps-models";
import { NodeConfig } from "@pufflig/ps-types";

export const openaiChatConfig: NodeConfig = {
  name: "OpenAI (Chat)",
  description: "OpenAI Chat",
  tags: ["adapter", "chat"],
  globals: [OPENAI_API_KEY],
  execution: {
    inputs: [
      {
        id: "exec:input",
      },
    ],
    outputs: [
      {
        id: "exec:output",
        name: "Completed",
      },
    ],
  },
  outputs: [
    {
      id: "message",
      name: "Message",
      description: "A message from OpenAI",
      type: "message",
      defaultValue: null,
    },
  ],
  inputs: [
    {
      id: "chat",
      name: "Chat",
      description: "The chat to send to OpenAI",
      type: "chat",
      defaultValue: {
        messages: [],
      },
    },
    {
      id: "model",
      name: "Model",
      description: "The model to use",
      type: "model",
      definition: openai.chat_models,
      defaultValue: {
        modelId: "gpt-3.5-turbo",
        parameters: {},
      },
    },
  ],
};
