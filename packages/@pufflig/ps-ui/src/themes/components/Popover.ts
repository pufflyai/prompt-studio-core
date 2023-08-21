import { popoverAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";
import { baseColors, borderColors, fontColors } from "../colors";

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(popoverAnatomy.keys);

const baseStyle = definePartsStyle({
  popper: {
    _focus: {
      boxShadow: "none !important",
    },
  },
  closeButton: {
    textStyle: "buttonText",
    ".chakra-ui-dark &": { color: fontColors.dark.PRIMARY },
    ".chakra-ui-light &": { color: fontColors.light.PRIMARY },
  },
  arrow: {
    ".chakra-ui-dark &": {
      bg: `${baseColors.dark[200]} !important`,
      borderColor: `${borderColors.dark.PRIMARY}`,
    },
    ".chakra-ui-light &": {
      bg: `${baseColors.light[200]} !important`,
      borderColor: `${borderColors.light.PRIMARY}`,
    },
  },
  content: {
    gap: "8px",
    paddingY: "16px",
    paddingX: "16px",
    borderRadius: "md",
    ".chakra-ui-dark &": { bg: baseColors.dark[200], border: `1px solid ${borderColors.dark.PRIMARY}` },
    ".chakra-ui-light &": { bg: baseColors.light[200], border: `1px solid ${borderColors.light.PRIMARY}` },
    _focus: {
      boxShadow: "none !important",
    },
  },
  header: {
    padding: 0,
    borderBottom: "none",
    textStyle: "assetTitle",
    ".chakra-ui-dark &": { bg: baseColors.dark[200] },
    ".chakra-ui-light &": { bg: baseColors.light[200] },
  },
  body: {
    padding: 0,
    textStyle: "primary",
  },
  footer: {},
});

export const popoverTheme = defineMultiStyleConfig({ baseStyle });
