import { Node, ParamValue } from "@pufflig/ps-types";

export interface ChainNode {
  id: string;
  type: keyof Chain["nodeTypes"];
  autorun?: boolean;
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
  input: Record<string, ParamValue>;
}

export interface Chain {
  nodeTypes: Record<string, Node>;
  definition: ChainDefinition;
  state: Record<string, NodeState>;
}

export interface RunOptions {
  resolveReferences?: (variable: string) => Promise<string>;
  onNodeInputUpdate?: (id: string, input: NodeState) => void;
  onNodeRunError?: (id: string, error: Error) => void;
  onNodeRunComplete?: (id: string, output: Record<string, ParamValue> | null) => void;
}
