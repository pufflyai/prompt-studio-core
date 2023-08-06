import _ from "lodash";
import { HandlebarTemplateCompletionInput, HandlebarTemplateCompletionOutput } from "@pufflig/ps-nodes-config";
import Mustache from "mustache";
import { objectDefinitionToMap } from "../utils/objectDefinitionToMap";

export const execute = async (input: HandlebarTemplateCompletionInput): Promise<HandlebarTemplateCompletionOutput> => {
  const { template, variables } = input;
  const variablesObject = objectDefinitionToMap(variables);
  const renderedTemplate = Mustache.render(template, variablesObject);
  return {
    text: renderedTemplate,
  };
};

export const handlebarTemplateCompletion = {
  execute,
};
