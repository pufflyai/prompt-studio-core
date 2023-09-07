import { ParamValue } from "@pufflig/ps-types";
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

  // replace variables with resolved variables, text might contain special characters
  const result = vars.reduce((acc, name, index) => {
    const regexString = "\\" + delimiterStart + name + delimiterEnd;
    const regex = new RegExp(regexString, "g");
    const value = resolvedVariables[index];
    return Object.entries(acc).reduce((acc2, [key, val]) => {
      return {
        ...acc2,
        [key]: typeof val === "string" ? val?.replace(regex, value) : val,
      };
    }, {} as Record<string, ParamValue>);
  }, input);

  return result;
};
