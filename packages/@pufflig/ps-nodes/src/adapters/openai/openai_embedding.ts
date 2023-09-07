import { nodes, nodeTypes, secretId } from "@pufflig/ps-nodes-config";
import { Execute, ModelValue, Node } from "@pufflig/ps-types";
import { Configuration, OpenAIApi } from "openai";

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

  const configuration = new Configuration({ apiKey: globals?.[secretId.OPENAI_API_KEY] });
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
