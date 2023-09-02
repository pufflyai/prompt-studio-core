import { forinNodeConfig, forinNodeType } from "./forin";
import { inputNodeConfig, inputNodeType } from "./input";
import { outputNodeConfig, outputNodeType } from "./output";

export const coreNodes = {
  [inputNodeType]: inputNodeConfig,
  [outputNodeType]: outputNodeConfig,
  [forinNodeType]: forinNodeConfig,
};

export const coreNodeTypes = {
  forinNodeType,
  inputNodeType,
  outputNodeType,
};
