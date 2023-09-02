import { nodes, nodeTypes } from "@pufflig/ps-nodes-config";
import { ModelValue, Node } from "@pufflig/ps-types";
import { Configuration, OpenAIApi } from "openai";

export interface OpenAIEmbeddingInput {
  api_key: string;
  text: string;
  model: ModelValue;
}

export interface OpenAIEmbeddingOutput {
  embedding: number[];
}

export const execute = async (input: OpenAIEmbeddingInput) => {
  const { model, api_key, text } = input as OpenAIEmbeddingInput;

  const configuration = new Configuration({ apiKey: api_key });
  const openai = new OpenAIApi(configuration);

  const response = await openai.createEmbedding({
    input: text,
    model: model.modelId,
  });

  const embedding = response.data.data[0].embedding;

  return { embedding };
};

export const openaiEmbedding: Node<OpenAIEmbeddingInput, OpenAIEmbeddingOutput> = {
  ...nodes[nodeTypes.openaiEmbeddingNodeType],
  execute,
};
