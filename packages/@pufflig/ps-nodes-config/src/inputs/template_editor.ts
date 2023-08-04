import { NodeConfig } from "../types";

export const templateEditor: NodeConfig = {
  type: "input/template_editor",
  name: "Template Editor",
  category: "input",
  description: "Template Editor",
  parameters: [],
  outputs: [
    {
      id: "prompt",
      name: "Prompt",
      description: "The prompt to send to OpenAI",
      type: "text",
    },
  ],
  inputs: [],
};
