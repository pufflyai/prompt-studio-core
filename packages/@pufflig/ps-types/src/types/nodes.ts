import { ChatMessage } from "./chat";

export type FormatType = "embedding" | "completion" | "chat";

export interface CompletionNodeIO {
  prompt: string;
  completion: string;
}

export interface EmbeddingNodeIO {
  text: string;
  embedding: number[];
}

export interface ChatNodeIO {
  messages: ChatMessage[];
}
