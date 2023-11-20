import { nodeTypes } from "@pufflig/ps-nodes-config";
import { llmCompletion } from "./llm/llm_completion";
import { openaiChat, openaiChatNodeType } from "./openai/openai_chat";
import { openaiCompletion, openaiCompletionNodeType } from "./openai/openai_completion";
import { openaiEmbedding } from "./openai/openai_embedding";
import { documentCheck } from "./document_check/document_check";
import { parseDocument } from "./parse_document/parse_document";

export const adapterNodes = {
  [openaiChatNodeType]: openaiChat,
  [openaiCompletionNodeType]: openaiCompletion,
  [nodeTypes.openaiEmbeddingNodeType]: openaiEmbedding,
  [nodeTypes.llmCompletionNodeType]: llmCompletion,
  [nodeTypes.parseDocumentNodeType]: parseDocument,
  [nodeTypes.documentCheckNodeType]: documentCheck,
};
