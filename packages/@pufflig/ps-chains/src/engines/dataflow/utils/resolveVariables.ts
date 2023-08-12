import { ParamValue } from "@pufflig/ps-types";
import Mustache from "mustache";
import { delimiterEnd, delimiterStart } from "../constants";
import { extractVariables } from "./extractVariables";

export const resolveVariables = async (
  input: Record<string, ParamValue>,
  resolver: (variableName: string) => Promise<string>
) => {
  // remove duplicate variables
  const vars = Object.keys(
    extractVariables(JSON.stringify(input))?.reduce((acc, variable) => {
      return {
        ...acc,
        [variable]: true,
      };
    }, {} as Record<string, boolean>) || []
  );

  if (!vars) return input;

  // fetch variables
  const promises: Promise<string>[] = [];
  vars.forEach((variable) => promises.push(resolver(variable)));
  const resolvedVariables = await Promise.all(promises);

  // map of variables with resolved variables
  const variablesMap = vars.reduce((acc, variable, index) => {
    acc[variable] = resolvedVariables[index];
    return acc;
  }, {} as Record<string, string>);

  // insert resolved variables into input
  const newInput: Record<string, ParamValue> = JSON.parse(
    Mustache.render(JSON.stringify(input), variablesMap, {}, [delimiterStart, delimiterEnd])
  );
  return newInput;
};
