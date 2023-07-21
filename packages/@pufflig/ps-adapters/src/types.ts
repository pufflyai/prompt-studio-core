import { ChatNodeIO, CompletionNodeIO, EmbeddingNodeIO, FormatType } from "@pufflig/ps-types";
export type AdapterNode = "adapter/openai" | "adapter/prompt-studio" | "adapter/custom_api";

export interface NumberParam {
  name: string;
  max: number;
  min: number;
  step: number;
  default: number;
  description: string;
}

export interface ModelConfig {
  modelId: string;
  format: FormatType;
  parameters: {
    [key: string]: NumberParam;
  };
}

export interface ModelSettings {
  modelId: string;
  parameters: {
    [key: string]: number | string;
  };
}

export interface AdapterConfig {
  id: string;
  name: string;
  adapterSettings: {
    [key: string]: {
      name: string;
      description: string;
      type: "secret" | "text";
    };
  };
  defaultModel: {
    [key in FormatType]: string;
  };
  models: {
    [key: string]: ModelConfig;
  };
}

export interface AdapterSettings {
  settings: {
    [key: string]: number | string;
  };
  model: ModelSettings;
}

export interface Adapter {
  createCompletion: (input: CompletionNodeIO, options: AdapterSettings) => Promise<CompletionNodeIO>;
  createChatCompletion: (messages: ChatNodeIO, options: AdapterSettings) => Promise<ChatNodeIO>;
  createEmbedding: (input: EmbeddingNodeIO, options: AdapterSettings) => Promise<EmbeddingNodeIO>;
}
