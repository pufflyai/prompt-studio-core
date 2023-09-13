import { nodes, nodeTypes } from "@pufflig/ps-nodes-config";
import { Node } from "@pufflig/ps-types";

export const modelNode: Node = {
  ...nodes[nodeTypes.modelNodeType],
};
