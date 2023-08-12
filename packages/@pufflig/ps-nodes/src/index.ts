import { openaiChat, nodeType as openaiChatNodeType } from "./adapters/openai/openai_chat";
import { openaiCompletion, nodeType as openaiCompletionNodeType } from "./adapters/openai/openai_completion";

export const nodes = {
  [openaiChatNodeType]: openaiChat,
  [openaiCompletionNodeType]: openaiCompletion,
};

export * from "./types";
