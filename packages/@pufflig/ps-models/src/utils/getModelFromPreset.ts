import { ModelValue } from "../types";

const presets: Record<string, ModelValue> = {
  accurate: {
    modelId: "gpt-4-1106-preview",
    parameters: {
      temperature: 0,
    },
  },
  casual: {
    modelId: "gpt-3.5-turbo-instruct",
    parameters: {
      temperature: 0.5,
    },
  },
  creative: {
    modelId: "gpt-3.5-turbo-instruct",
    parameters: {
      temperature: 1,
    },
  },
};

export const getModelFromPreset = (presetBehavior: keyof typeof presets) => {
  return presets[presetBehavior];
};
