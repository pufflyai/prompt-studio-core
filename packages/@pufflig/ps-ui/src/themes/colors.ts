// https://coolors.co/ffe3e0-fbc3bc-f7a399-f38375-ef6351-ee5844-ec4732
export const brandColors = {
  50: "#ffe3e0",
  100: "#fbc3bc",
  200: "#f7a399",
  300: "#F27B6C",
  400: "#EF6351",
  500: "#ef6351",
  600: "#EE5844",
  700: "#EE5844",
  800: "#EE5844",
  900: "#EC4732",
};

export const selectableColors = {
  200: "#2b3945",
  300: "#485763",
  400: "#364653",
  500: "#D1D7E0",
  600: "#E0E4EB",
  700: "#E8EBF0",
};

export const selectablePrimaryColors = {
  200: "#fbc3bc",
  300: "#f7a399",
  400: "#ef6351",
  500: "#fbc3bc",
  600: "#f7a399",
  700: "#ef6351",
};

export const baseColors = {
  // https://coolors.co/0a1014-0e161c-111a21-17222b-2b3945-2f3d49
  dark: {
    900: "#070B0E",
    800: "#0A1014",
    600: "#0e161c",
    400: "#111a21",
    200: "#17222b",
    100: "#2b3945",
    60: "#364653",
  },
  // https://coolors.co/ffffff-f8f8f8-f0f1f1-e9eaea-d1d7e0
  light: {
    900: "#FFFFFF",
    800: "#F2F2F2",
    600: "#F8F8F8",
    400: "#F0F1F1",
    200: "#E9EAEA",
    100: "#D1D7E0",
    60: "#E0E6EE",
  },
};

export const sectionColors = {
  dark: {
    sidebar: baseColors.dark[900],
    header: baseColors.dark[900],
    base: baseColors.dark[900],
    secondary: baseColors.dark[800],
    editor: baseColors.dark[600],
    modal: baseColors.dark[200],
    prompt: baseColors.dark[800],
  },
  light: {
    sidebar: baseColors.light[900],
    header: baseColors.light[900],
    base: baseColors.light[900],
    secondary: baseColors.light[600],
    editor: baseColors.light[900],
    modal: baseColors.light[900],
    prompt: baseColors.light[600],
  },
};

export const borderColors = {
  dark: {
    PRIMARY: "#2b3945",
    SECONDARY: "#17222b",
  },
  light: {
    PRIMARY: "#d1d7e0",
    SECONDARY: "#e9eaea",
  },
};

export const fontColors = {
  dark: {
    PRIMARY: "#ebf1f5",
    SECONDARY: "#82919e",
  },
  light: {
    PRIMARY: "#111d2f",
    SECONDARY: "#82919e",
  },
};

export const colors = {
  font: fontColors,
  brand: brandColors,
  border: borderColors,
  base: baseColors,
  selectable: selectableColors,
  selectablePrimary: selectablePrimaryColors,
};
