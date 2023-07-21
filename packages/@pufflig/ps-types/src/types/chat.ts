export type ChatMessageRole = "user" | "assistant" | "system" | "function";

export interface ChatMessage {
  role: ChatMessageRole;
  content: string;
  name?: string;
}
