import { Param, ParamValue } from "@pufflig/ps-types";

/**
 * currently only support text and number
 * @param param
 * @returns
 */
export const getParamType = (param: ParamValue): Param["type"] => {
  if (typeof param === "string") {
    return "text";
  }

  if (typeof param === "number") {
    return "number";
  }

  return "text";
};
