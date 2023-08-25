import type { Meta, StoryObj } from "@storybook/react";

import { Preview } from "./Preview";

const meta: Meta<typeof Preview> = {
  title: "Theme/Preview",
  component: Preview,
};

export default meta;

type Story = StoryObj<typeof Preview>;

export const Primary: Story = {
  render: () => <Preview />,
};
