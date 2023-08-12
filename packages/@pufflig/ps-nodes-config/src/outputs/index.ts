import { displayChat } from "./display/display_chat";
import { displayCompletion } from "./display/display_completion";

export const outputNodes = {
  "output/display_chat": displayChat,
  "output/display_completion": displayCompletion,
};
