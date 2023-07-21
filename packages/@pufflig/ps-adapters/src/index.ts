import { openaiConfig, openai } from "./adapters/openai";

export * from "./types";

export const adapters = {
  openai,
};

export const configs = {
  openai: openaiConfig,
};
