import { inputNode, inputNodeType } from "./input";
import { outputNode, outputNodeType } from "./output";

export const coreNodes = {
  [inputNodeType]: inputNode,
  [outputNodeType]: outputNode,
};
