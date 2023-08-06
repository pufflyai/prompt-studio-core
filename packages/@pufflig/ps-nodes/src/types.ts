import { NodeType } from "@pufflig/ps-nodes-config";

export interface Node {
  execute: (input: any) => Promise<Record<string, any>>;
}

export type Nodes = Record<NodeType, Node>;
