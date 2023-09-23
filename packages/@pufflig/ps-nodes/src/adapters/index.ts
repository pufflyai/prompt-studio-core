import { nodeTypes } from "@pufflig/ps-nodes-config";
import { llmCompletion } from "./llm/llm_completion";
import { openaiChat, openaiChatNodeType } from "./openai/openai_chat";
import { openaiCompletion, openaiCompletionNodeType } from "./openai/openai_completion";
import { openaiEmbedding } from "./openai/openai_embedding";

export const adapterNodes = {
  [openaiChatNodeType]: openaiChat,
  [openaiCompletionNodeType]: openaiCompletion,
  [nodeTypes.openaiEmbeddingNodeType]: openaiEmbedding,
  [nodeTypes.llmCompletionNodeType]: llmCompletion,
};
