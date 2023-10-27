import { ModelDefinition } from "@pufflig/ps-types";

export const OPEN_ROUTER_API_KEY = "open_router/api_key";

export const open_router_settings = [
  {
    id: OPEN_ROUTER_API_KEY,
    name: "Open Router API Key",
    description: "Your Open Router API key",
  },
];

export const open_router_completion: ModelDefinition = {
  "gryphe/mythomax-l2-13b": {
    modelId: "gryphe/mythomax-l2-13b",
    description: "An improved, potentially even perfected variant of MythoMix.",
    settings: open_router_settings,
    contextLength: 4096,
    parameters: [
      {
        id: "temperature",
        type: "number",
        name: "Temperature",
        max: 2,
        min: 0,
        step: 0.1,
        defaultValue: 0.4,
        description: "",
      },
    ],
  },
  "meta-llama/llama-2-13b-chat": {
    modelId: "meta-llama/llama-2-13b-chat",
    description: "Meta: Llama v2 13B Chat (beta)",
    settings: open_router_settings,
    contextLength: 4096,
    parameters: [
      {
        id: "temperature",
        type: "number",
        name: "Temperature",
        max: 2,
        min: 0,
        step: 0.1,
        defaultValue: 0.4,
        description: "",
      },
    ],
  },
  "anthropic/claude-2": {
    modelId: "anthropic/claude-2",
    description: "Claude: superior performance on tasks that require complex reasoning",
    settings: open_router_settings,
    contextLength: 8192,
    parameters: [
      {
        id: "temperature",
        type: "number",
        name: "Temperature",
        max: 1,
        min: 0,
        step: 0.1,
        defaultValue: 1,
        description: "Amount of randomness injected into the response.",
      },
      {
        id: "top_p",
        type: "number",
        name: "Top P",
        max: 1,
        min: 0,
        step: 0.1,
        defaultValue: 0.7,
        description:
          "In nucleus sampling, we compute the cumulative distribution over all the options for each subsequent token in decreasing probability order and cut it off once it reaches a particular probability specified by top_p. You should either alter temperature or top_p, but not both.",
      },
      {
        id: "top_k",
        type: "number",
        name: "Top K",
        max: 100,
        min: 0,
        step: 1,
        defaultValue: 5,
        description: "Only sample from the top K options for each subsequent token.",
      },
    ],
  },
};
