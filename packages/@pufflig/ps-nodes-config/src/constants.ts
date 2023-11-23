import { chat_models, completion_models } from "@pufflig/ps-models";

export const default_model = "gpt-3.5-turbo-instruct";

export const available_models = [
  "gpt-3.5-turbo-instruct",
  "gpt-4-1106-preview",
  "anthropic/claude-2",
  "meta-llama/llama-2-13b-chat",
];

export const models = Object.values({ ...completion_models, ...chat_models })
  .filter((model) => available_models.includes(model.modelId))
  .reduce((acc, model) => {
    acc[model.modelId] = model;
    return acc;
  }, {} as Record<string, any>);
