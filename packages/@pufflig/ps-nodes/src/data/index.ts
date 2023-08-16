import { messageNode, messageNodeType } from "./message/message";
import { textNode, textNodeType } from "./text/text";

export const dataNodes = {
  [textNodeType]: textNode,
  [messageNodeType]: messageNode,
};
