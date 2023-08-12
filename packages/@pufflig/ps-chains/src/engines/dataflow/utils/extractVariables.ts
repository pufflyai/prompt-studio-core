import Mustache from "mustache";
import { delimiterEnd, delimiterStart } from "../constants";

/**
 * Extract the top level variables from a handlebar template, prefixed by variablePrefix
 * If resolving the variable fails, return null.
 * @param template the handlebar template
 * @param onError callback to handle errors
 * @returns the list of variables or null if the template is malformed
 */
export const extractVariables = (template: string, onError: (err: any) => void = () => {}) => {
  try {
    return Mustache.parse(template, [delimiterStart, delimiterEnd])
      .filter((v) => v[0] === "name" || v[0] === "#")
      .map((v) => v[1]);
  } catch (err: any) {
    onError(err);
    return null;
  }
};
