import { nodes } from "@pufflig/ps-nodes-config";
import { Node } from "@pufflig/ps-types";

export const displayChatNodeType = "output/display_chat" as const;

export const displayChat: Node = {
  ...nodes[displayChatNodeType],
  execute: async (i) => i,
  parseInput: async (i) => i,
};
