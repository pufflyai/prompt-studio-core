import { nodeTypes } from "@pufflig/ps-nodes-config";
import { customApiChat, customApiChatNodeType } from "./custom_api/custom_api_chat";
import { customApiCompletion, customApiCompletionNodeType } from "./custom_api/custom_api_completion";
import { openaiChat, openaiChatNodeType } from "./openai/openai_chat";
import { openaiCompletion, openaiCompletionNodeType } from "./openai/openai_completion";
import { openaiEmbedding } from "./openai/openai_embedding";

export const adapterNodes = {
  [openaiChatNodeType]: openaiChat,
  [openaiCompletionNodeType]: openaiCompletion,
  [nodeTypes.openaiEmbeddingNodeType]: openaiEmbedding,
  [customApiChatNodeType]: customApiChat,
  [customApiCompletionNodeType]: customApiCompletion,
};
