import "@fontsource/fira-mono/400.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/600.css";
import "@fontsource/lato/400.css";
import "@fontsource/lato/700.css";

import { extendTheme } from "@chakra-ui/react";

import { borders } from "./borders";
import { colors } from "./colors";
import { buttonTheme } from "./components/Button";
import { dividerTheme } from "./components/Divider";
import { drawerTheme } from "./components/Drawer";
import { inputTheme } from "./components/Input";
import { menuTheme } from "./components/Menu";
import { modalTheme } from "./components/Modal";
import { popoverTheme } from "./components/Popover";
import { skeletonTheme } from "./components/Skeleton";
import { textareaTheme } from "./components/Textarea";
import { globalStyles } from "./global";
import { shadows } from "./shadows";
import { fontSizes, fonts, textStyles } from "./text";

export const pufflyTheme = extendTheme({
  borders,
  colors,
  fonts,
  fontSizes,
  shadows,
  styles: globalStyles,
  textStyles,
  components: {
    Skeleton: skeletonTheme,
    Button: buttonTheme,
    Textarea: textareaTheme,
    Divider: dividerTheme,
    Input: inputTheme,
    Modal: modalTheme,
    Menu: menuTheme,
    Popover: popoverTheme,
    Drawer: drawerTheme,
  },
});
