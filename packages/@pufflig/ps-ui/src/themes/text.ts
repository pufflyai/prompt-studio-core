import { fontColors } from "./colors";

export const fonts = {
  heading: "Lato, sans-serif",
  body: "Inter, sans-serif",
  mono: "Fira Mono, monospace",
};

export const fontSizes = {
  xs: "9px",
  sm: "10px",
  md: "12px",
  lg: "14px",
  xl: "16px",
  "2xl": "24px",
  "3xl": "28px",
  "4xl": "36px",
  "5xl": "48px",
  "6xl": "64px",
};

export const textStyles = {
  pageTitle: {
    fontFamily: "heading",
    fontSize: "2xl",
    ".chakra-ui-dark &": { color: fontColors.dark.PRIMARY },
    ".chakra-ui-light &": { color: fontColors.light.PRIMARY },
  },
  assetTitle: {
    fontFamily: "heading",
    fontSize: "xl",
    ".chakra-ui-dark &": { color: fontColors.dark.PRIMARY },
    ".chakra-ui-light &": { color: fontColors.light.PRIMARY },
  },
  panelTitle: {
    fontWeight: "bold",
    fontFamily: "heading",
    fontSize: "lg",
    ".chakra-ui-dark &": { color: fontColors.dark.PRIMARY },
    ".chakra-ui-light &": { color: fontColors.light.PRIMARY },
  },
  promptText: {
    fontFamily: "mono",
    fontSize: "md",
    lineHeight: "2",
    ".chakra-ui-dark &": { color: fontColors.dark.PRIMARY },
    ".chakra-ui-light &": { color: fontColors.light.PRIMARY },
  },
  listItemText: {
    fontFamily: "body",
    fontSize: "md",
    ".chakra-ui-dark &": { color: fontColors.dark.PRIMARY },
    ".chakra-ui-light &": { color: fontColors.light.PRIMARY },
  },
  buttonText: {
    fontWeight: "bold",
    fontFamily: "body",
    fontSize: "sm",
  },
  assetSubheader: {
    fontFamily: "body",
    fontSize: "xs",
    ".chakra-ui-dark &": { color: fontColors.dark.SECONDARY },
    ".chakra-ui-light &": { color: fontColors.light.SECONDARY },
  },
  primary: {
    fontFamily: "body",
    fontSize: "md",
    ".chakra-ui-dark &": { color: fontColors.dark.PRIMARY },
    ".chakra-ui-light &": { color: fontColors.light.PRIMARY },
  },
  secondary: {
    fontFamily: "body",
    fontSize: "md",
    ".chakra-ui-dark &": { color: fontColors.dark.SECONDARY },
    ".chakra-ui-light &": { color: fontColors.light.SECONDARY },
  },
  danger: {
    fontFamily: "body",
    fontSize: "md",
    ".chakra-ui-dark &": { colorSchema: "red" },
    ".chakra-ui-light &": { colorSchema: "red" },
  },
};
