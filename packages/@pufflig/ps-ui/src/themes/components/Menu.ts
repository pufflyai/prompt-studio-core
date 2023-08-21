import { menuAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";
import { baseColors, borderColors } from "../colors";

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(menuAnatomy.keys);

const baseStyle = definePartsStyle({
  groupTitle: {
    textStyle: "assetSubheader",
  },
  item: {
    textStyle: "listItemText",
    ".chakra-ui-dark &": { bg: baseColors.dark[200], _hover: { bg: baseColors.dark[400] } },
    ".chakra-ui-light &": { bg: baseColors.light[200], _hover: { bg: baseColors.light[400] } },
  },
  list: {
    zIndex: 10,
    textStyle: "primary",
    ".chakra-ui-dark &": { bg: baseColors.dark[200], borderColor: borderColors.dark.SECONDARY },
    ".chakra-ui-light &": { bg: baseColors.light[200], borderColor: borderColors.light.SECONDARY },
  },
});

export const menuTheme = defineMultiStyleConfig({ baseStyle });
