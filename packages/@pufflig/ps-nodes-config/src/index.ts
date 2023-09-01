import { adapterNodeTypes, adapterNodes, adapterSettings, modelConfig } from "./adapters";
import { coreNodes } from "./core";
import { dataNodeTypes, dataNodes } from "./data";
import { modifierNodes } from "./modifiers";

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

export const userSettings = {
  ...adapterSettings,
};

export const models = {
  ...modelConfig,
};

export const nodeTypes = {
  ...dataNodeTypes,
  ...adapterNodeTypes,
};

export * from "./types";

export type NodeType = keyof typeof nodes;
