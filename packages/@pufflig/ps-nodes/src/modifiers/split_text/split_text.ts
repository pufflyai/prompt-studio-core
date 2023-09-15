import { nodeTypes, nodes } from "@pufflig/ps-nodes-config";
import { Node } from "@pufflig/ps-types";
import { split } from "./strategies/strategies";

interface SplitTextInput {
  text: string;
  method: "paragraph";
  chunkSize: number;
}

export const splitText: Node = {
  ...nodes[nodeTypes.splitTextNodeType],
  execute: async (input: SplitTextInput) => {
    const { text, method, chunkSize } = input;

    if (!text) {
      return { list: [] };
    }

    const list = split[method](text, chunkSize);

    return {
      list: list,
    };
  },
};
