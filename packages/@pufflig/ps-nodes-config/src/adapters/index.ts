import { llmCompletionConfig, llmCompletionNodeType } from "./llm/llm_completion";
import { openaiChatConfig } from "./openai/openai_chat";
import { openaiCompletionConfig } from "./openai/openai_completion";
import { openaiEmbeddingConfig, openaiEmbeddingNodeType } from "./openai/openai_embedding";
import { documentCheck, documentCheckNodeType } from "./document_check/document_check";
import { parseDocument, parseDocumentNodeType } from "./parse_document/parse_document";

export const adapterNodes = {
  "adapter/openai_chat": openaiChatConfig,
  "adapter/openai_completion": openaiCompletionConfig,
  [openaiEmbeddingNodeType]: openaiEmbeddingConfig,
  [llmCompletionNodeType]: llmCompletionConfig,
  [documentCheckNodeType]: documentCheck,
  [parseDocumentNodeType]: parseDocument,
};

export const adapterNodeTypes = {
  openaiEmbeddingNodeType,
  llmCompletionNodeType,
  documentCheckNodeType,
  parseDocumentNodeType,
};
