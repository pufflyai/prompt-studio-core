import { ParamValue } from "@pufflig/ps-types";
import { resolveVariables } from "./resolveVariables";

/**
 * Remove all variables from an input object
 *
 * @param input
 * @returns
 */
export const sanitizeInput = (input: Record<string, ParamValue>) => {
  return resolveVariables(input, async () => {
    return "";
  });
};
