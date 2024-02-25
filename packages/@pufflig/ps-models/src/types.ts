export interface BaseParam {
  id: string;
  name: string;
  description: string;
}

export interface TextParam extends BaseParam {
  type: "text";
  defaultValue: string;
  singleLine?: boolean;
}

export interface NumberParam extends BaseParam {
  type: "number";
  defaultValue: number;
  min?: number;
  max?: number;
  step?: number;
}

export interface ModelConfig {
  modelId: string;
  description?: string;
  settings?: BaseParam[];
  streaming?: boolean;
  contextLength: number;
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
