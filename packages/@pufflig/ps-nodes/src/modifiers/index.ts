import { appendToChat, appendToChatNodeType } from "./append_to/append_to_chat";
import { handlebarTemplateChat, handlebarTemplateChatNodeType } from "./handlebar_template/handlebar_template_chat";
import {
  handlebarTemplateCompletion,
  handlebarTemplateCompletionNodeType,
} from "./handlebar_template/handlebar_template_completion";

export const modifierNodes = {
  [handlebarTemplateChatNodeType]: handlebarTemplateChat,
  [handlebarTemplateCompletionNodeType]: handlebarTemplateCompletion,
  [appendToChatNodeType]: appendToChat,
};
