import { defineStyleConfig } from "@chakra-ui/react";
import { brandColors, fontColors } from "../colors";

export const buttonTheme = defineStyleConfig({
  variants: {
    primary: {
      ".chakra-ui-dark &": {
        bg: brandColors[400],
        _hover: { bg: brandColors[300] },
        _active: { bg: brandColors[600] },
        color: fontColors.dark.PRIMARY,
      },
      ".chakra-ui-light &": {
        bg: brandColors[400],
        _hover: { bg: brandColors[300] },
        _active: { bg: brandColors[600] },
        color: fontColors.dark.PRIMARY,
      },
    },
    danger: {
      ".chakra-ui-dark &": {
        bg: "red.600",
        _hover: { bg: "red.500" },
        _active: { bg: "red.400" },
        color: fontColors.dark.PRIMARY,
      },
      ".chakra-ui-light &": {
        bg: "red.600",
        _hover: { bg: "red.500" },
        _active: { bg: "red.400" },
        color: fontColors.dark.PRIMARY,
      },
    },
    secondary: {
      ".chakra-ui-dark &": {
        bg: "#1e2a34",
        _hover: { bg: "#26313B" },
        _active: { bg: "#222E38" },
        color: fontColors.dark.PRIMARY,
      },
      ".chakra-ui-light &": {
        bg: "#e0e2e6",
        _hover: { bg: "#E8EAED" },
        _active: { bg: "#E4E6EA" },
        color: fontColors.light.PRIMARY,
      },
    },
  },
  baseStyle: {
    textStyle: "buttonText",
    ".chakra-ui-dark &": { color: fontColors.dark.PRIMARY },
    ".chakra-ui-light &": { color: fontColors.light.PRIMARY },
  },
  defaultProps: { size: "sm", colorScheme: "selectable" },
});
