import { NodeConfig, NodeType } from "@pufflig/ps-nodes-config";
import { Node } from "@pufflig/ps-nodes";
import { ParamValue } from "@pufflig/ps-types";

export interface ChainNode extends Node {
  id: string;
  type: NodeType;
  autorun?: boolean;
  config: NodeConfig;
  editor: {
    position: { x: number; y: number };
  };
}

export interface ChainEdge {
  id: string;
  source: string;
  target: string;
  sourceHandle: string;
  targetHandle: string;
}

export interface ChainDefinition {
  edges: Record<string, ChainEdge>;
  nodes: Record<string, ChainNode>;
}

export interface NodeState {
  status: "idle" | "running" | "streaming" | "error";
  data: Record<string, ParamValue>;
}

export interface Chain {
  definition: ChainDefinition;
  state: Record<string, NodeState>;
}

export interface RunOptions {
  callbacks?: Callbacks;
  resolver: (variable: string) => Promise<string>;
}

export interface Callbacks {
  onNodeInputUpdate?: (id: string, input: Record<string, ParamValue>) => void;
  onNodeRunError?: (id: string, error: Error) => void;
}
