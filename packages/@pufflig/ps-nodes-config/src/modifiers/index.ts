import { appendToChat } from "./append_to/append_to_chat";
import { handlebarTemplateChat } from "./handlebar_template/handlebar_template_chat";
import { handlebarTemplateCompletion } from "./handlebar_template/handlebar_template_completion";

export const modifierNodes = {
  "modifier/handlebar_template_chat": handlebarTemplateChat,
  "modifier/handlebar_template_completion": handlebarTemplateCompletion,
  "modifier/append_to_chat": appendToChat,
};
