import { nodeTypes, nodes } from "@pufflig/ps-nodes-config";
import { Node } from "@pufflig/ps-types";

export const numberNode: Node = {
  ...nodes[nodeTypes.numberNodeType],
};
