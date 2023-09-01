import { Param, ParamValueMap } from "./params";

export interface Exec {
  id: string;
  name?: string;
}

export interface NextNode {
  execSource: string;
  inputs: ParamValueMap;
}

export interface NodeConfig {
  name: string;
  description?: string;
  tags?: string[];
  customSchema?: "input" | "output" | "both";
  execution?: {
    inputs: Exec[];
    outputs: Exec[];
  };
  parameters: Param[];
  inputs: Param[];
  outputs: Param[];
}

export interface NodeActions<I = ParamValueMap, O = ParamValueMap> {
  execute?: (input: I, prevInput?: Partial<I>) => Promise<O | null>;
  mapInput?: (input: I, prevInput?: Partial<I>) => Promise<I>;
  getTargets?: (result: O) => Promise<NextNode[]>;
}

export type Node<I = ParamValueMap, O = ParamValueMap> = NodeConfig & NodeActions<I, O>;
