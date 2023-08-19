import { ModelValue } from "./params";

export type ChatMessageRole = "user" | "assistant" | "system" | "function";

export interface ChatMessage {
  id: string;
  role: ChatMessageRole;
  content: string;
  createdAt: string;
  provider: string;
  name?: string;
  isDisabled?: boolean;
  versions?: ChatMessage[];
  model?: ModelValue;
  user?: {
    name: string;
    picture: string;
  };
}

export interface ChatFunction {
  name: string;
  description?: string;
  parameters?: {
    [key: string]: any;
  };
}

export interface Chat {
  messages: ChatMessage[];
  functions?: ChatFunction[];
}
