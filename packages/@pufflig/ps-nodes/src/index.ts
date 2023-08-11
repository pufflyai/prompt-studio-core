import { openaiChat } from "./adapters/openai_chat";
import { openaiCompletion } from "./adapters/openai_completion";
import { handlebarTemplateChat } from "./modifiers/handlebar_template/handlebar_template_chat";
import { handlebarTemplateCompletion } from "./modifiers/handlebar_template/handlebar_template_completion";
import { Nodes } from "./types";

export const nodes: Nodes = {
  "adapter/custom_api_chat": { execute: async (input) => input, parseInput: async (input) => input },
  "adapter/custom_api_completion": { execute: async (input) => input, parseInput: async (input) => input },
  "adapter/openai_chat": openaiChat,
  "adapter/openai_completion": openaiCompletion,
  "input/template_editor": { execute: async (input) => input, parseInput: async (input) => input },
  "modifier/handlebar_template_chat": handlebarTemplateChat,
  "modifier/handlebar_template_completion": handlebarTemplateCompletion,
  "output/chat_display": { execute: async (input) => input, parseInput: async (input) => input },
  "output/completion_display": { execute: async (input) => input, parseInput: async (input) => input },
};

export * from "./types";
