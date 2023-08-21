import { Box, Icon, IconButton, useColorMode } from "@chakra-ui/react";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { convertIcon } from "../src/utils/convertIcon";

export const BaseStory = ({ children }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Box padding="1rem">
      <Box marginBottom="1rem">
        <IconButton
          onClick={toggleColorMode}
          aria-label="theme switch"
          icon={<Icon as={convertIcon(colorMode === "light" ? faSun : faMoon)} />}
        />
      </Box>
      {children}
    </Box>
  );
};
