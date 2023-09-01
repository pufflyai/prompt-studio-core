import { nodes, nodeTypes } from "@pufflig/ps-nodes-config";
import { ModelValue, Node } from "@pufflig/ps-types";
import { Configuration, OpenAIApi } from "openai";

export interface OpenAIEmbeddingInput {
  api_key: string;
  text: string;
  model: ModelValue;
}

export interface OpenAICompletionOutput {
  completion: string;
}

export async function execute(input: OpenAIEmbeddingInput) {
  const { model, api_key, text } = input;

  const configuration = new Configuration({ apiKey: api_key });
  const openai = new OpenAIApi(configuration);

  const response = await openai.createEmbedding({
    input: text,
    model: model.modelId,
  });

  const embedding = response.data.data[0].embedding;

  return { embedding };
}

export const openaiCompletion: Node = {
  ...nodes[nodeTypes.openaiEmbeddingNodeType],
  execute,
  mapInput: async (i) => i,
};
