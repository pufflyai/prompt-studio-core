import { Param, ParamValue } from "./params";

export interface Node {
  name: string;
  description?: string;
  tags?: string[];
  parameters: Param[];
  inputs: Param[];
  outputs: Param[];
  execute: (input: Record<string, ParamValue>) => Promise<Record<string, ParamValue>>;
  parseInput: (
    input: Record<string, ParamValue>,
    prev?: Record<string, ParamValue>
  ) => Promise<Record<string, ParamValue>>;
}
