import { HandlebarTemplateCompletionInput, HandlebarTemplateCompletionOutput } from "@pufflig/ps-nodes-config";
import Mustache from "mustache";

export const runHandlebarTemplateCompletion = async (
  input: HandlebarTemplateCompletionInput
): Promise<HandlebarTemplateCompletionOutput> => {
  const { template, variables } = input;
  const renderedTemplate = Mustache.render(template, variables);
  return {
    text: renderedTemplate,
  };
};
