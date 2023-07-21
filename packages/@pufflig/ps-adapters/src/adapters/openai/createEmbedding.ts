import { Configuration, OpenAIApi } from "openai";
import { AdapterSettings } from "../../types";
import { EmbeddingNodeIO } from "@pufflig/ps-types";

export async function createEmbedding(io: EmbeddingNodeIO, options: AdapterSettings): Promise<EmbeddingNodeIO> {
  const { text } = io;
  const { model, settings } = options;
  const { modelId } = model;
  const { apiKey } = settings;

  // this might slowdown the response time
  const configuration = new Configuration({ apiKey: apiKey as string });
  const openai = new OpenAIApi(configuration);
  // --

  const response = await openai.createEmbedding({
    input: text,
    model: modelId,
  });

  const embedding = response.data.data[0].embedding;

  return {
    text,
    embedding,
  };
}
