import { customApiChat, customApiChatNodeType } from "./custom_api/custom_api_chat";
import { customApiCompletion, customApiCompletionNodeType } from "./custom_api/custom_api_completion";
import { openaiChat, openaiChatNodeType } from "./openai/openai_chat";
import { openaiCompletion, openaiCompletionNodeType } from "./openai/openai_completion";

export const adapterNodes = {
  [openaiChatNodeType]: openaiChat,
  [openaiCompletionNodeType]: openaiCompletion,
  [customApiChatNodeType]: customApiChat,
  [customApiCompletionNodeType]: customApiCompletion,
};
