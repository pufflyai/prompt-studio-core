import { defineStyleConfig } from "@chakra-ui/react";
import { borderColors } from "../colors";

export const dividerTheme = defineStyleConfig({
  baseStyle: {
    _light: {
      borderColor: borderColors.light.PRIMARY,
    },
    _dark: {
      borderColor: borderColors.dark.SECONDARY,
    },
  },
});
