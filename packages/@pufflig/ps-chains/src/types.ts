import { NodeConfig, NodeType } from "@pufflig/ps-nodes-config";
import { ParamValue } from "@pufflig/ps-types";

export interface ChainNode {
  id: string;
  type: NodeType;
}

export interface ChainEdge {
  id: string;
  source: string;
  target: string;
  source_handle: string;
  target_handle: string;
}

export interface ChainDefinition {
  edges: ChainEdge[];
  nodes: (ChainNode & NodeConfig)[];
}

export interface NodeState {
  status: "idle" | "running" | "streaming" | "error";
  data: Record<string, ParamValue>;
  editor: {
    position: { x: number; y: number };
  };
}

export interface Chain {
  definition: ChainDefinition;
  state: Record<string, NodeState>;
}
