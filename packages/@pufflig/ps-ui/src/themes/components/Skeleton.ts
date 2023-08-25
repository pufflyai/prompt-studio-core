import { defineStyle, defineStyleConfig, cssVar } from "@chakra-ui/react";
import { baseColors } from "../colors";

const $startColor = cssVar("skeleton-start-color");
const $endColor = cssVar("skeleton-end-color");

const base = defineStyle({
  borderRadius: "md",
  _light: {
    [$startColor.variable]: baseColors.light[200],
    [$endColor.variable]: baseColors.light[600],
  },
  _dark: {
    [$startColor.variable]: baseColors.dark[200],
    [$endColor.variable]: baseColors.dark[600],
  },
});

export const skeletonTheme = defineStyleConfig({
  variants: { base },
  defaultProps: {
    variant: "base",
  },
});
