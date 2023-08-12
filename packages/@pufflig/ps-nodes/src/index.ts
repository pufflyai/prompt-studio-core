import { adapterNodes } from "./adapters";
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

export * from "./types";
