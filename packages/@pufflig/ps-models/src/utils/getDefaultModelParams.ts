import { models } from "..";

export const getDefaultModelParams = (modelId: string) => {
  const modelDefinition = models[modelId];

  if (!modelDefinition) {
    return {};
  }

  return modelDefinition.parameters.reduce((acc, param) => {
    acc[param.id] = param.defaultValue;
    return acc;
  }, {} as Record<string, number | string>);
};
