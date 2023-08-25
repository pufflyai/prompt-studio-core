import { Param } from "./params";

export interface Exec {
  id: string;
  name?: string;
}

export interface NodeConfig {
  name: string;
  description?: string;
  tags?: string[];
  execution?: {
    inputs: Exec[];
    outputs: Exec[];
  };
  parameters: Param[];
  inputs: Param[];
  outputs: Param[];
}

export interface NodeActions {
  execute: (input: any, prevInput?: any) => Promise<any>;
  parseInput: (input: any, prevInput?: any) => Promise<any>;
}

export type Node = NodeConfig & NodeActions;
