export interface NumberParam {
  name: string;
  max: number;
  min: number;
  step: number;
  default: number;
  description: string;
}

export interface TextParam {
  type: "string";
  name: string;
  description: string;
  creatable?: boolean;
}

export interface Params {
  [key: string]: NumberParam | TextParam;
}
