import { defineStyleConfig } from "@chakra-ui/react";
import { baseColors, borderColors, fontColors } from "../colors";

export const textareaTheme = defineStyleConfig({
  baseStyle: {
    outline: "0px",
    _light: {
      ":focus-visible": {
        boxShadow: "0 0 0 1px #ee5844",
      },
      background: baseColors.light[600],
      color: fontColors.light.PRIMARY,
      borderColor: borderColors.light.SECONDARY,
      "::placeholder": {
        color: fontColors.light.SECONDARY,
      },
    },
    _dark: {
      ":focus-visible": {
        boxShadow: "0 0 0 1px #ee5844",
      },
      background: baseColors.dark[800],
      color: fontColors.dark.PRIMARY,
      borderColor: borderColors.dark.SECONDARY,
      "::placeholder": {
        color: fontColors.dark.SECONDARY,
      },
    },
  },
});
