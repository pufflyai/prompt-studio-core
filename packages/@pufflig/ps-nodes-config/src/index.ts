import { adapterNodeTypes, adapterNodes } from "./adapters";
import { coreNodeTypes, coreNodes } from "./core";
import { dataNodeTypes, dataNodes } from "./data";
import { modifierNodeTypes, modifierNodes } from "./modifiers";

export const nodes = {
  ...adapterNodes,
  ...dataNodes,
  ...modifierNodes,
  ...coreNodes,
};

export const adapters = adapterNodes;
export const data = dataNodes;
export const modifiers = modifierNodes;
export const core = coreNodes;

export const nodeTypes = {
  ...adapterNodeTypes,
  ...coreNodeTypes,
  ...dataNodeTypes,
  ...modifierNodeTypes,
};

export * from "./types";

export type NodeType = keyof typeof nodes;
