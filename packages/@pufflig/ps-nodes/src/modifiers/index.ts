import { nodeTypes } from "@pufflig/ps-nodes-config";
import { addMessage } from "./add_message/add_message";
import { addText } from "./add_text/add_text";
import { documentCheck } from "./document_check/document_check";
import { parseDocument } from "./parse_document/parse_document";
import { splitText } from "./split_text/split_text";
import { templateChat } from "./template/template_chat";
import { templateText } from "./template/template_text";

export const modifierNodes = {
  [nodeTypes.addMessageNodeType]: addMessage,
  [nodeTypes.addTextNodeType]: addText,
  [nodeTypes.splitTextNodeType]: splitText,
  [nodeTypes.templateChatNodeType]: templateChat,
  [nodeTypes.templateTextNodeType]: templateText,
  [nodeTypes.parseDocumentNodeType]: parseDocument,
  [nodeTypes.documentCheckNodeType]: documentCheck,
};
