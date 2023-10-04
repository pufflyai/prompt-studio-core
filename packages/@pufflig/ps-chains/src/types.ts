import { Node, NodeConfig, ParamValue } from "@pufflig/ps-types";

export interface FlowNode {
  id: string;
  type: string;
  editor?: {
    position: { x: number; y: number };
  };
}

export interface FlowEdge {
  id: string;
  source: string;
  target: string;
  sourceHandle: string;
  targetHandle: string;
}

export interface FlowDefinition {
  nodes: Record<string, FlowNode>;
  edges: Record<string, FlowEdge>;
}

export interface Flow {
  nodeTypes: Record<string, Node>;
  definition: FlowDefinition;
  state: Record<string, NodeState>;
}

export interface FlowConfiguration {
  nodeTypes: Record<string, NodeConfig>;
  definition: FlowDefinition;
  state: Record<string, NodeState>;
}

export interface NodeState {
  status: "idle" | "running" | "streaming" | "error";
  input: Record<string, ParamValue>;
}

export interface RunOptions {
  mode?: "dataflow" | "controlflow";
  logLevel?: "debug" | "error";
  globals?: Record<string, string>;
  resolveReferences?: (variable: string) => Promise<string>;
  onNodeInputUpdate?: (id: string, input: NodeState) => void;
  onNodeRunError?: (id: string, error: Error) => void;
  onNodeRunComplete?: (id: string, output: Record<string, ParamValue> | null) => void;
}
