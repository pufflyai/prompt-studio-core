import { displayChat, displayChatNodeType } from "./display/display_chat";
import { displayCompletion, displayCompletionNodeType } from "./display/display_completion";

export const outputNodes = {
  [displayChatNodeType]: displayChat,
  [displayCompletionNodeType]: displayCompletion,
};
