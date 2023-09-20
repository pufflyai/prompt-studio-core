import { hf_completion, hf_settings } from "./models/hf";
import { open_router_completion, open_router_settings } from "./models/open_router";
import { openai_chat, openai_completion, openai_embedding, openai_settings } from "./models/openai";

export const chat_models = { ...openai_chat };
export const completion_models = { ...openai_completion, ...open_router_completion, ...hf_completion };
export const embedding_models = { ...openai_embedding };
export const models = { ...openai_chat, ...openai_completion, ...open_router_completion, ...hf_completion };
export const settings = { ...openai_settings, ...hf_settings, ...open_router_settings };

export type CompletionModels = keyof typeof completion_models;
export type ChatModels = keyof typeof chat_models;
export type EmbeddingModels = keyof typeof embedding_models;

export const openai = {
  chat_models: openai_chat,
  completion_models: openai_completion,
  embedding_models: openai_embedding,
};

// export globals
export { OPENAI_API_KEY } from "./models/openai";
