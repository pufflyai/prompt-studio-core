import { Modifier } from "../../types";
import { modifyChat } from "./modifyChat";
import { modifyCompletion } from "./modifyCompletion";

export const handlebarTemplate: Modifier = {
  modifyChat,
  modifyCompletion,
};
