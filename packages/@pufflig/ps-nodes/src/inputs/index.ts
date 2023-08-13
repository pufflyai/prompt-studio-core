import { messageInput, messageInputType } from "./message_input/message_input";
import { templateEditor, templateEditorNodeType } from "./template_editor/template_editor";

export const inputNodes = {
  [templateEditorNodeType]: templateEditor,
  [messageInputType]: messageInput,
};
