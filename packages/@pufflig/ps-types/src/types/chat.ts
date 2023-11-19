import { ModelValue } from "./params";

export type ChatMessageRole = "user" | "assistant" | "system" | "tool";

export interface BaseMessage {
  name?: string;
  function_call?: {
    name: string;
    arguments: string;
  };
  tool_call_id?: string;
  content: string;
  role: ChatMessageRole;
}

export interface ChatMessage extends BaseMessage {
  id: string;
  createdAt: string;
  tool?: ToolCall;
  isDisabled?: boolean;
  versions?: ChatMessage[];
  model?: ModelValue;
  provider: string;
  user?: {
    name: string;
    picture: string;
  };
}

export interface ToolDefinition {
  description: string;
  name: string;
  parameters: Record<string, any>;
}

export interface ToolCall {
  index: number;
  id?: string;
  function?: {
    arguments?: string;
    name?: string;
  };
  type?: "function";
}

export interface Chat {
  messages: ChatMessage[];
  tools?: ToolDefinition[];
}
