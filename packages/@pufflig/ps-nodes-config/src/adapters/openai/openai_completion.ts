import { NodeConfig } from "@pufflig/ps-types";
import { completionModels } from "./openai_models";

export const openaiCompletionConfig: NodeConfig = {
  name: "OpenAI (Completion)",
  description: "OpenAI Completion",
  tags: ["adapter", "text"],
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
  parameters: [
    {
      id: "api_key",
      name: "API Key",
      type: "secret",
      description: "The API key for OpenAI",
      defaultValue: "${{ps:ref:secret:openai/api_key}}",
    },
  ],
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
      definition: completionModels,
      defaultValue: {
        modelId: "text-davinci-003",
        parameters: {},
      },
    },
  ],
};
