import { nodes } from "@pufflig/ps-nodes-config";
import { Node } from "@pufflig/ps-types";

export const messageInputType = "input/message_input" as const;

export const messageInput: Node = {
  ...nodes[messageInputType],
  execute: async (i) => i,
  parseInput: async (i) => i,
};
