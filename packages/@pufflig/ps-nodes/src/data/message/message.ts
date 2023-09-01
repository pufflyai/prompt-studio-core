import { nodes, nodeTypes } from "@pufflig/ps-nodes-config";
import { Node } from "@pufflig/ps-types";

export const messageNode: Node = {
  ...nodes[nodeTypes.messageNodeType],
};
