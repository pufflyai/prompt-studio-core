import { nodeTypes, nodes } from "@pufflig/ps-nodes-config";
import { NextNode, Node } from "@pufflig/ps-types";

export interface ForinNodeInputs {
  list: Array<string>;
}

export interface ForinNodeOutputs {
  item: string;
}

const getTargets = async (input: ForinNodeInputs) => {
  const stack: NextNode[] = [];
  const { list } = input;

  for (let i = 0; i < list.length; i++) {
    const item = list[i];
    const nextNode: NextNode = {
      execSource: "output",
      inputs: {
        item,
      },
    };
    stack.push(nextNode);
  }

  stack.push({
    execSource: "complete",
    inputs: {},
  });

  return stack;
};

export const forinNode: Node<ForinNodeInputs, ForinNodeOutputs> = {
  ...nodes[nodeTypes.forinNodeType],
  getTargets,
};
