import { Param, ParamValue } from "./params";

export interface NodeConfig {
  name: string;
  description?: string;
  tags?: string[];
  parameters: Param[];
  inputs: Param[];
  outputs: Param[];
}

export interface Node<InputType = Record<string, ParamValue>, OutputType = Record<string, ParamValue>>
  extends NodeConfig {
  execute: (input: InputType) => Promise<OutputType>;
  parseInput: (input: InputType, prev?: InputType) => Promise<InputType>;
}
