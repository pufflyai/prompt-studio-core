import { mode } from "@chakra-ui/theme-tools";
import { borderColors, fontColors } from "./colors";

export const globalStyles = {
  global: (props: any) => ({
    ":root": {
      "--separator-border": mode(borderColors.light.SECONDARY, borderColors.dark.SECONDARY)(props),
      "--focus-border": "transparent",
    },
    "::selection": {
      color: fontColors.light.PRIMARY,
      background: "teal.300",
    },
    html: {
      height: "100%",
    },
    body: {
      height: "100%",
      bg: mode("base.light.800", "base.dark.800")(props),
      color: mode("font.light.PRIMARY", "font.dark.PRIMARY")(props),
      borderColor: mode("border.light.PRIMARY", "border.dark.PRIMARY")(props),
      fontFamily: "body",
      fontSize: "md",
    },
    "#root": {
      height: "100%",
    },
    a: {
      color: mode("teal.500", "teal.300")(props),
    },
    ".sash": {
      zIndex: "docked",
    },
  }),
};
