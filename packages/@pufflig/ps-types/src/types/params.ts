import { ChatMessage } from "./chat";

export interface BaseParam {
  id: string;
  name: string;
  description: string;
}

export interface NumberParam extends BaseParam {
  type: "number";
  defaultValue: number;
  min?: number;
  max?: number;
  step?: number;
}

export interface TextParam extends BaseParam {
  type: "text";
  defaultValue: string;
  singleLine?: boolean;
}

export interface SelectionParam extends BaseParam {
  type: "selection";
  defaultValue: string;
  options: { id: string; name: string }[];
}

export interface APIDefinition {
  url: string;
  header: string;
  body: string;
  method: string;
  completionPath: string;
  promptPath: string;
}

export interface APIParam extends BaseParam {
  type: "api";
  defaultValue: APIDefinition | null;
}

export interface ModelConfig {
  modelId: string;
  parameters: (NumberParam | TextParam)[];
}

export interface ModelValue {
  modelId: string;
  parameters: {
    [key: string]: number | string;
  };
}

export interface ModelDefinition {
  [key: string]: ModelConfig;
}

export interface ModelParam extends BaseParam {
  type: "model";
  defaultValue: ModelValue;
  definition: ModelDefinition;
}

export interface ChatParam extends BaseParam {
  type: "chat";
  defaultValue: ChatMessage[];
}

export interface SecretParam extends BaseParam {
  type: "secret";
  defaultValue: string;
}

export interface MessageParam extends BaseParam {
  type: "message";
  defaultValue: ChatMessage | null;
}

export type Param =
  | NumberParam
  | TextParam
  | SelectionParam
  | APIParam
  | ModelParam
  | ChatParam
  | SecretParam
  | MessageParam;
