import { Param } from "@pufflig/ps-types";

export type NodeCategory = "input" | "modifier" | "adapter" | "converter" | "output";

export interface NodeConfig {
  type: string;
  category: NodeCategory;
  format?: "chat" | "text";
  name: string;
  description: string;
  inputs: Param[];
  outputs: Param[];
  parameters: Param[];
}

export interface UserSettings {
  name: string;
  description: string;
  settings: {
    [key: string]: {
      name: string;
      description: string;
      type: "secret" | "text";
    };
  };
}

// adapters
export type { OpenAIChatInput, OpenAIChatOutput } from "./adapters/openai/openai_chat";
export type { OpenAICompletionInput, OpenAICompletionOutput } from "./adapters/openai/openai_completion";

// modifiers
export type { HandlebarTemplateChatInput, HandlebarTemplateChatOutput } from "./modifiers/handlebar_template_chat";
export type {
  HandlebarTemplateCompletionInput,
  HandlebarTemplateCompletionOutput,
} from "./modifiers/handlebar_template_completion";
