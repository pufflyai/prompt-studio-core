import { nodes } from "@pufflig/ps-nodes-config";
import { Node } from "@pufflig/ps-types";

export const templateEditorNodeType = "input/template_editor" as const;

export const templateEditor: Node = {
  ...nodes[templateEditorNodeType],
  execute: async (i) => i,
  parseInput: async (i) => i,
};
