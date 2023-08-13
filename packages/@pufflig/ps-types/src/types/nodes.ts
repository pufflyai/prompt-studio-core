import { Param, ParamValue } from "./params";

export interface NodeConfig {
  name: string;
  description?: string;
  tags?: string[];
  parameters: Param[];
  inputs: Param[];
  outputs: Param[];
}

export interface Node<InputType = Record<string, ParamValue>, OutputType = Record<string, ParamValue> | null>
  extends NodeConfig {
  execute: (input: InputType, prevInput: InputType) => Promise<OutputType>;
  parseInput: (input: InputType, prevInput: InputType) => Promise<InputType>;
}
