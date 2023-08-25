import { modalAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";
import { baseColors } from "../colors";

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(modalAnatomy.keys);

const baseStyle = definePartsStyle({
  header: {
    textStyle: "assetTitle",
  },
  body: {
    textStyle: "primary",
  },
  dialog: {
    ".chakra-ui-dark &": { bg: baseColors.dark[200] },
    ".chakra-ui-light &": { bg: baseColors.light[200] },
  },
});

export const modalTheme = defineMultiStyleConfig({ baseStyle });
