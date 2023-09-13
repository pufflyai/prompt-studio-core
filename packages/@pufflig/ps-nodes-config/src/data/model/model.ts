import { NodeConfig } from "@pufflig/ps-types";
import { chatModels, completionModels, embeddingModels } from "../../models/openai_models";

export const modelNodeType = "data/model" as const;

export const model: NodeConfig = {
  name: "LLM",
  description: "Configuration for a Large Language Model.",
  tags: ["data", "model", "completion"],
  outputs: [
    {
      id: "model",
      name: "Model",
      description: "Configuration of the selected LLM.",
      type: "model",
      definition: { ...completionModels, ...chatModels, ...embeddingModels },
      defaultValue: {
        modelId: "text-davinci-003",
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
      defaultValue: "text-davinci-003",
      options: Object.keys({ ...completionModels, ...chatModels, ...embeddingModels }).map((modelId) => ({
        id: modelId,
        name: modelId,
      })),
    },
  ],
};
