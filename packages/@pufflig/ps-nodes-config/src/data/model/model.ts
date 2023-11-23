import { default_completion_model, models } from "@pufflig/ps-models";
import { NodeConfig } from "@pufflig/ps-types";

export const modelNodeType = "data/model" as const;

export const model: NodeConfig = {
  name: "LLM",
  description: "Configuration for a Large Language Model.",
  tags: ["data", "model", "completion"],
  status: "experimental",
  outputs: [
    {
      id: "model",
      name: "Model",
      description: "Configuration of the selected LLM.",
      type: "model",
      definition: { ...models },
      defaultValue: {
        modelId: default_completion_model,
        parameters: {},
      },
    },
  ],
  inputs: [
    {
      id: "modelId",
      name: "Model Name",
      description: "The name of the model to use.",
      type: "selection",
      defaultValue: default_completion_model,
      options: Object.keys({ ...models }).map((modelId) => ({
        id: modelId,
        name: modelId,
      })),
    },
  ],
};
