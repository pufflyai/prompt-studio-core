import { adapterNodes } from "./adapters";
import { coreNodes } from "./core";
import { dataNodes } from "./data";
import { modifierNodes } from "./modifiers";
import { Nodes } from "./types";

export const nodes: Nodes = {
  ...adapterNodes,
  ...dataNodes,
  ...modifierNodes,
  ...coreNodes,
};

export const adapters = adapterNodes;
export const data = dataNodes;
export const modifiers = modifierNodes;
export const core = coreNodes;

export * from "./types";
