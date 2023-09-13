import { groupNode, groupNodeType } from "./group/group";
import { list, listNodeType } from "./list/list";
import { message, messageNodeType } from "./message/message";
import { model, modelNodeType } from "./model/model";
import { number, numberNodeType } from "./number/number";
import { text, textNodeType } from "./text/text";

export const dataNodes = {
  [groupNodeType]: groupNode,
  [listNodeType]: list,
  [messageNodeType]: message,
  [modelNodeType]: model,
  [numberNodeType]: number,
  [textNodeType]: text,
};

export const dataNodeTypes = {
  groupNodeType,
  listNodeType,
  messageNodeType,
  modelNodeType,
  numberNodeType,
  textNodeType,
};
