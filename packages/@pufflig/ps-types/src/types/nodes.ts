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

export type Execute<I = any, O = any> = (input: I, prevInput?: Partial<I>) => Promise<O | null>;
export type MapInput<I = any> = (input: I, prevInput?: Partial<I>) => Promise<I | null>;
export type GetTargets<O = any> = (result: O) => Promise<NextNode[]>;

export interface NodeActions<I = any, O = any> {
  execute?: Execute<I, O>;
  mapInput?: MapInput<I>;
  getTargets?: GetTargets<O>;
}

export type Node<I = any, O = any> = NodeConfig & NodeActions<I, O>;
