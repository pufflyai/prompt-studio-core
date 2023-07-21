import { CompletionNodeInput } from "@pufflig/ps-types";
import Mustache from "mustache";
import { ModifierSettings } from "../../types";

export const modifyCompletion = async (input: CompletionNodeInput, settings: ModifierSettings) => {
  const { prompt } = input;
  const { variables } = settings;
  const renderedTemplate = Mustache.render(prompt, variables);
  return {
    res: renderedTemplate,
  };
};
