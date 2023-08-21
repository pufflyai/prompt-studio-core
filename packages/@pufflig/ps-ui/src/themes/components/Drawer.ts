import { drawerAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";
import { baseColors } from "../colors";

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(drawerAnatomy.keys);

const baseStyle = definePartsStyle({
  // define the part you're going to style
  dialog: {
    _light: {
      background: baseColors.light[800],
    },
    _dark: {
      background: baseColors.dark[800],
    },
  },
});

export const drawerTheme = defineMultiStyleConfig({ baseStyle });
