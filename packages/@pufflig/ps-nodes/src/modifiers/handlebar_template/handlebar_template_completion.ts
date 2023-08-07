import { HandlebarTemplateCompletionInput } from "@pufflig/ps-nodes-config";
import _ from "lodash";
import Mustache from "mustache";
import { Node } from "../../types";
import { objectDefinitionToMap } from "../../utils/objectDefinitionToMap";
import { extractVariables } from "./utils/extractVariables";

export const execute = async (input: HandlebarTemplateCompletionInput) => {
  const { template, variables } = input;
  const variablesObject = objectDefinitionToMap(variables);
  const renderedTemplate = Mustache.render(template, variablesObject);
  return {
    text: renderedTemplate,
  };
};

export const parseInput = async (
  input: HandlebarTemplateCompletionInput,
  prev?: Partial<HandlebarTemplateCompletionInput>
) => {
  const { template, variables } = input;

  const extractedVariables = extractVariables(template);

  if (extractedVariables) {
    // extracted variables that already existed in the previous input are assigned the previous value
    const variablesObject = extractedVariables.map((variable) => {
      const prevVariable = (prev?.variables || []).find((v) => v.id === variable.id);
      if (prevVariable) {
        return {
          ...variable,
          defaultValue: prevVariable.defaultValue,
        };
      }
      return variable;
    });

    const newVariables = _.unionBy(_.intersectionBy(variables, variablesObject, "id"), variablesObject as any, "id");

    return {
      ...input,
      variables: newVariables,
    };
  }

  return {
    ...input,
    variables,
  };
};

export const handlebarTemplateCompletion: Node = {
  execute,
  parseInput,
};
