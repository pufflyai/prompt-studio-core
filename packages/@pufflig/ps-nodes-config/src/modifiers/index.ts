import { addMessage, addMessageNodeType } from "./add_message/add_message";
import { addText, addTextNodeType } from "./add_text/add_text";
import { splitText, splitTextNodeType } from "./split_text/split_text";
import { templateChat, templateChatNodeType } from "./template/template_chat";
import { templateText, templateTextNodeType } from "./template/template_text";
import { templateTextNodeTypeV2, templateTextV2 } from "./template/template_text_v2";

export const modifierNodes = {
  [addMessageNodeType]: addMessage,
  [addTextNodeType]: addText,
  [splitTextNodeType]: splitText,
  [templateChatNodeType]: templateChat,
  [templateTextNodeType]: templateText,
  [templateTextNodeTypeV2]: templateTextV2,
};

export const modifierNodeTypes = {
  addMessageNodeType,
  addTextNodeType,
  splitTextNodeType,
  templateChatNodeType,
  templateTextNodeType,
  templateTextNodeTypeV2,
};
