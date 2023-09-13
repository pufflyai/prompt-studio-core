import { nodeTypes } from "@pufflig/ps-nodes-config";
import { groupNode } from "./group/group";
import { listNode } from "./list/list";
import { messageNode } from "./message/message";
import { modelNode } from "./model/model";
import { numberNode } from "./number/number";
import { textNode } from "./text/text";

export const dataNodes = {
  [nodeTypes.groupNodeType]: groupNode,
  [nodeTypes.listNodeType]: listNode,
  [nodeTypes.messageNodeType]: messageNode,
  [nodeTypes.modelNodeType]: modelNode,
  [nodeTypes.numberNodeType]: numberNode,
  [nodeTypes.textNodeType]: textNode,
};
