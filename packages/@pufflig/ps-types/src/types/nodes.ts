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
  status?: "stable" | "experimental" | "deprecated";
  tags?: string[];
  customSchema?: "input" | "output" | "both";
  globals?: string[];
  execution?: {
    inputs: Exec[];
    outputs: Exec[];
  };
  inputs: Param[];
  outputs: Param[];
}

export interface NodeOptions<I> {
  prevInput?: Partial<I>;
  globals?: Record<string, string>;
}

export type Execute<I = any, O = any> = (input: I, options?: NodeOptions<I>) => Promise<O | null>;
export type MapInput<I = any> = (input: I, options?: NodeOptions<I>) => Promise<Partial<I> | null>;
export type GetTargets<I = any, O = any> = (
  input: I,
  result?: O,
  options?: NodeOptions<I>
) => Promise<NextNode<Partial<O>>[]>;
export type GetInputDefinition<I = any> = (input: I, options?: NodeOptions<I>) => Param[];

export interface NodeActions<I = any, O = any> {
  execute?: Execute<I, O>;
  mapInput?: MapInput<I>;
  getTargets?: GetTargets<I, O>;
  getInputDefinition?: GetInputDefinition<I>;
}

export type Node<I = any, O = any> = NodeConfig & NodeActions<I, O>;
