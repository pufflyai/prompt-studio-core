import { nodeTypes, nodes } from "@pufflig/ps-nodes-config";
import { Node } from "@pufflig/ps-types";

export const listNode: Node = {
  ...nodes[nodeTypes.messageNodeType],
};
