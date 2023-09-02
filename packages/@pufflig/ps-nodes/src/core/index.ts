import { nodeTypes } from "@pufflig/ps-nodes-config";
import { forinNode } from "./forin";
import { inputNode } from "./input";
import { outputNode } from "./output";

export const coreNodes = {
  [nodeTypes.inputNodeType]: inputNode,
  [nodeTypes.outputNodeType]: outputNode,
  [nodeTypes.forinNodeType]: forinNode,
};
