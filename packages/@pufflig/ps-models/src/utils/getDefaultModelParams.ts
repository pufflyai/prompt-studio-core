import { models } from "..";

export const getDefaultModelParams = (modelId: string) => {
  const modelDefinition = models[modelId];

  if (!modelDefinition) {
    return {};
  }

  return Object.entries(modelDefinition.parameters).reduce((acc, [key, param]) => {
    acc[key] = param.defaultValue;
    return acc;
  }, {} as Record<string, number | string>);
};
