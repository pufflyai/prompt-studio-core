import { Param } from "./params";

export interface Exec {
  id: string;
  name?: string;
}

export interface NextNode<I = any> {
  execSource: string;
  inputs: I;
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
export type MapInput<I = any> = (input: I, prevInput?: Partial<I>) => Promise<Partial<I> | null>;
export type GetTargets<I = any, O = any> = (
  input: I,
  prevInput?: Partial<I>,
  result?: O
) => Promise<NextNode<Partial<O>>[]>;

export interface NodeActions<I = any, O = any> {
  execute?: Execute<I, O>;
  mapInput?: MapInput<I>;
  getTargets?: GetTargets<I, O>;
}

export type Node<I = any, O = any> = NodeConfig & NodeActions<I, O>;
