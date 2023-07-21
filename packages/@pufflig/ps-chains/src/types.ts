import { AdapterNode } from "@pufflig/ps-adapters";
import { ModifierNode } from "@pufflig/ps-modifiers";
import { ChatMessage, CompletionNodeIO } from "@pufflig/ps-types";

export interface ChainDefinition {
  nodes: CompletionNode[];
}

export interface CompletionNode {
  id: AdapterNode | ModifierNode;
  enabled: boolean;
  write: "prompt" | "completion";
  options: {
    [key: string]: any;
  };
}

export interface ChatNode {
  id: AdapterNode | ModifierNode;
  enabled: boolean;
  options: {
    [key: string]: any;
  };
}

export interface ChainState {
  status: "idle" | "running" | "error";
  nodes: CompletionNodeState[];
}

export interface CompletionNodeState {
  id: AdapterNode | ModifierNode;
  status: "idle" | "running" | "streaming" | "error";
  result: CompletionNodeIO | null;
}

export interface ChatNodeState {
  id: AdapterNode | ModifierNode;
  status: "idle" | "running" | "streaming" | "error";
  result: CompletionNodeIO | null;
}

export interface CompletionRun {
  runId: string;
  createdAt: Date;
  chain: ChainDefinition;
  prompt: string;
  completion: string;
  promptTokens?: number;
  completionTokens?: number;
}

export interface EmbeddingRun {
  runId: string;
  createdAt: Date;
  chain: ChainDefinition;
  text: string;
  embedding: number[];
}

export interface ChatRun {
  runId: string;
  createdAt: Date;
  chain: ChainDefinition;
  messages: ChatMessage[];
}
