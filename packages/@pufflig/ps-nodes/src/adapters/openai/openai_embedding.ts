import { OPENAI_API_KEY } from "@pufflig/ps-models";
import { nodes, nodeTypes } from "@pufflig/ps-nodes-config";
import { Execute, ModelValue, Node } from "@pufflig/ps-types";
import OpenAI from "openai";

export interface OpenAIEmbeddingInput {
  api_key: string;
  text: string;
  model: ModelValue;
}

export interface OpenAIEmbeddingOutput {
  embedding: number[];
}

export const execute: Execute<OpenAIEmbeddingInput> = async (input, options = {}) => {
  const { model, text } = input;
  const { globals } = options;
  const openai = new OpenAI({ apiKey: globals?.[OPENAI_API_KEY] });

  const response = await openai.embeddings.create({
    input: text,
    model: model.modelId,
  });

  const embedding = response.data[0].embedding;

  return { embedding };
};

export const openaiEmbedding: Node<OpenAIEmbeddingInput, OpenAIEmbeddingOutput> = {
  ...nodes[nodeTypes.openaiEmbeddingNodeType],
  execute,
};
