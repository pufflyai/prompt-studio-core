import { adapterNodes, adapterSettings, modelConfig } from "./adapters";
import { inputNodes } from "./inputs";
import { modifierNodes } from "./modifiers";
import { outputNodes } from "./outputs";

export const nodes = {
  ...adapterNodes,
  ...inputNodes,
  ...modifierNodes,
  ...outputNodes,
};

export const adapters = adapterNodes;
export const inputs = inputNodes;
export const modifiers = modifierNodes;
export const outputs = outputNodes;

export const userSettings = {
  ...adapterSettings,
};

export const models = {
  ...modelConfig,
};

export * from "./types";

export type NodeType = keyof typeof nodes;
