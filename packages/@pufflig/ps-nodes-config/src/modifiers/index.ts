import { addMessage, addMessageNodeType } from "./add_message/add_message";
import { addText, addTextNodeType } from "./add_text/add_text";
import { parseDocument, parseDocumentNodeType } from "./parse_document/parse_document";
import { splitText, splitTextNodeType } from "./split_text/split_text";
import { templateChat, templateChatNodeType } from "./template/template_chat";
import { templateText, templateTextNodeType } from "./template/template_text";

export const modifierNodes = {
  [addMessageNodeType]: addMessage,
  [addTextNodeType]: addText,
  [parseDocumentNodeType]: parseDocument,
  [splitTextNodeType]: splitText,
  [templateChatNodeType]: templateChat,
  [templateTextNodeType]: templateText,
};

export const modifierNodeTypes = {
  addMessageNodeType,
  addTextNodeType,
  parseDocumentNodeType,
  splitTextNodeType,
  templateChatNodeType,
  templateTextNodeType,
};
