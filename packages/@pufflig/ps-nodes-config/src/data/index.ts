import { message, messageNodeType } from "./message/message";
import { objectNode, objectNodeType } from "./object/object";
import { text, textNodeType } from "./text/text";

export const dataNodes = {
  [textNodeType]: text,
  [messageNodeType]: message,
  [objectNodeType]: objectNode,
};

export const dataNodeTypes = {
  textNodeType,
  messageNodeType,
  objectNodeType,
};
