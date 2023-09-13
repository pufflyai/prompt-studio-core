import { nodes, nodeTypes } from "@pufflig/ps-nodes-config";
import { Node } from "@pufflig/ps-types";

interface MessageNodeInput {
  content: string;
  role: string;
}

export const messageNode: Node = {
  ...nodes[nodeTypes.messageNodeType],
  execute: async (input: MessageNodeInput) => {
    return {
      message: {
        role: input.role,
        content: input.content,
      },
    };
  },
};
