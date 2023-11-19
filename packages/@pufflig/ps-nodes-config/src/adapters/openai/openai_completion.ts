import { openai, OPENAI_API_KEY } from "@pufflig/ps-models";
import { NodeConfig } from "@pufflig/ps-types";
import { default_model } from "../../constants";

export const openaiCompletionConfig: NodeConfig = {
  name: "OpenAI (Completion)",
  description: "OpenAI Completion",
  status: "deprecated",
  tags: ["adapter", "text"],
  globals: [OPENAI_API_KEY],
  execution: {
    inputs: [
      {
        id: "exec:input",
      },
    ],
    outputs: [
      {
        id: "exec:output",
        name: "Completed",
      },
    ],
  },
  outputs: [
    {
      id: "completion",
      name: "Completion",
      description: "The completion from OpenAI",
      type: "text",
      defaultValue: "",
    },
  ],
  inputs: [
    {
      id: "prompt",
      name: "Prompt",
      description: "The prompt to send to OpenAI",
      type: "text",
      defaultValue: "",
    },
    {
      id: "model",
      name: "Model",
      description: "The model to use",
      type: "model",
      definition: openai.completion_models,
      defaultValue: {
        modelId: default_model,
        parameters: {},
      },
    },
  ],
};
