import { hf_completion, hf_settings } from "./models/hf";
import { open_router_completion, open_router_settings } from "./models/open_router";
import { openai_chat, openai_completion, openai_embedding, openai_settings } from "./models/openai";

export const chat_models = { ...openai_chat };
export const completion_models = { ...openai_completion, ...open_router_completion, ...hf_completion };
export const embedding_models = { ...openai_embedding };
export const models = { ...openai_chat, ...openai_completion, ...open_router_completion, ...hf_completion };

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

// openai specific models
export const openai = {
  chat_models: openai_chat,
  completion_models: openai_completion,
  embedding_models: openai_embedding,
};

export const default_completion_model = "gpt-3.5-turbo-instruct";
