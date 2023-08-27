import { nodeTypes } from "@pufflig/ps-nodes-config";
import { messageNode } from "./message/message";
import { objectNode } from "./object/object";
import { textNode } from "./text/text";

export const dataNodes = {
  [nodeTypes.textNodeType]: textNode,
  [nodeTypes.messageNodeType]: messageNode,
  [nodeTypes.objectNodeType]: objectNode,
};
