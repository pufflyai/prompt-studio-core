import { CompletionNodeIO } from "@pufflig/ps-types";
import Mustache from "mustache";
import { ModifierSettings } from "../../types";

export const modifyCompletion = async (
  input: CompletionNodeIO,
  settings: ModifierSettings
): Promise<CompletionNodeIO> => {
  const { prompt, completion } = input;
  const { variables } = settings;
  const renderedTemplate = Mustache.render(prompt, variables);
  return {
    prompt: renderedTemplate,
    completion,
  };
};
