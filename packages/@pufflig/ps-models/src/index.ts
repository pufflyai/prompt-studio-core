import { ModelConfig } from "@pufflig/ps-types";
import { hf_completion, hf_settings } from "./models/hf";
import { open_router_completion, open_router_settings } from "./models/open_router";
import { openai_chat, openai_completion, openai_embedding, openai_settings } from "./models/openai";

export const chat_models = { ...openai_chat };
export const completion_models = { ...openai_completion, ...open_router_completion, ...hf_completion };
export const embedding_models = { ...openai_embedding };

// provider settings
export const settings = [...openai_settings, ...hf_settings, ...open_router_settings];
export const providers = [
  {
    name: "OpenAI",
    description: "OpenAI API",
    settings: openai_settings,
  },
  {
    name: "HuggingFace",
    description: "",
    settings: hf_settings,
  },
  {
    name: "Open Router",
    description: "",
    settings: open_router_settings,
  },
];

// export globals variables
export { OPENAI_API_KEY } from "./models/openai";
export { HF_ACCESS_TOKEN } from "./models/hf";
export { OPEN_ROUTER_API_KEY } from "./models/open_router";

// provider specific models
export const openai = {
  chat_models: openai_chat,
  completion_models: openai_completion,
  embedding_models: openai_embedding,
};

export const hf = {
  completion_models: hf_completion,
};

export const open_router = {
  completion_models: open_router_completion,
};

// defaults
export const default_completion_model = "gpt-3.5-turbo-instruct";
export const default_assistant_model = "gpt-4-1106-preview";

export const available_models = [
  "gpt-3.5-turbo-instruct",
  "gpt-4-1106-preview",
  "anthropic/claude-2",
  "meta-llama/llama-2-13b-chat",
];

export const models = Object.entries({ ...completion_models, ...chat_models })
  .filter(([modelId]) => available_models.includes(modelId))
  .reduce((acc, [modelId, model]) => {
    acc[modelId] = model;
    return acc;
  }, {} as Record<string, ModelConfig>);

export { getDefaultModelParams } from "./utils/getDefaultModelParams";
