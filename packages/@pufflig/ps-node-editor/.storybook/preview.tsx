import { ChakraProvider } from "@chakra-ui/react";
import type { Preview } from "@storybook/react";
import React from "react";
import { BaseStory } from "./BaseStory";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    (Story) => (
      <ChakraProvider>
        <BaseStory>
          <Story />
        </BaseStory>
      </ChakraProvider>
    ),
  ],
};

export default preview;
