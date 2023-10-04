import { NumberParam, Param, TextParam } from "@pufflig/ps-types";
import Mustache from "mustache";

/**
 * extract the top level variables from a handlebar template.
 * @param template
 * @returns
 */
export const extractVariables = (template: string, onError: (err: any) => void = () => {}): Param[] | null => {
  try {
    return Mustache.parse(template)
      .filter((v) => v[0] === "name" || v[0] === "#")
      .map((v) => {
        return {
          defaultValue: v[0] === "#" ? [] : "",
          description: "",
          id: v[1],
          name: v[1],
          type: v[0] === "#" ? "list" : "text",
        } as NumberParam | TextParam;
      });
  } catch (err: any) {
    onError(err);
    return null;
  }
};
