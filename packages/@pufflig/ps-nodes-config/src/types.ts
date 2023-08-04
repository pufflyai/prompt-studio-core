export type ParamType = "text" | "number" | "boolean" | "message" | "chat" | "secret" | "tool" | "model" | "api";
export type NodeCategory = "input" | "modifier" | "adapter" | "converter" | "output";

export interface NumberParam {
  name: string;
  max?: number;
  min?: number;
  step?: number;
  default: number;
  description: string;
}

export interface TextParam {
  name: string;
  default: string;
  description: string;
}

export interface ModelConfig {
  modelId: string;
  parameters: {
    [key: string]: NumberParam | TextParam;
  };
}

export interface APIConfig {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  payloadPath: string;
  resultPath: string;
  body: {
    // change to a definition that can be edited by the user
    // of the API config
    [key: string]: string;
  };
  headers: {
    [key: string]: string;
  };
}

export interface Models {
  defaultModel: string;
  models: {
    [key: string]: ModelConfig;
  };
}

export interface Param {
  id: string;
  name: string;
  description: string;
  type: ParamType;
  value?: string | number | boolean;
  default?: string | number | boolean;
  definition?: Models;
}

export interface NodeConfig {
  type: string;
  category: NodeCategory;
  format?: "chat" | "text";
  name: string;
  description: string;
  custom_inputs?: boolean;
  custom_input_schema?: {
    type: ParamType;
  };
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

export type ChatMessageRole = "user" | "assistant" | "system" | "function";

export interface ChatMessage {
  role: ChatMessageRole;
  content: string;
  name?: string;
}

export interface Chat {
  messages: ChatMessage[];
}
