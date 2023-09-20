import { openai, OPENAI_API_KEY } from "@pufflig/ps-models";
import { NodeConfig } from "@pufflig/ps-types";

export const openaiEmbeddingNodeType = "adapter/openai_embedding" as const;

export const openaiEmbeddingConfig: NodeConfig = {
  name: "OpenAI (Embedding)",
  description: "OpenAI Embedding",
  tags: ["adapter", "embedding"],
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
      id: "embedding",
      name: "Embedding",
      description: "Embedding generated by OpenAI",
      type: "vector",
      defaultValue: [],
    },
  ],
  inputs: [
    {
      id: "text",
      name: "Text",
      description: "The text to generate an embedding for",
      type: "text",
      defaultValue: "",
    },
    {
      id: "model",
      name: "Model",
      description: "The model to use",
      type: "model",
      definition: openai.embedding_models,
      defaultValue: {
        modelId: "text-embedding-ada-002",
        parameters: {},
      },
    },
  ],
};
