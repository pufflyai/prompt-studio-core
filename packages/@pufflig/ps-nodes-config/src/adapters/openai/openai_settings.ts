import { UserSettings } from "../../types";

export const openAISettings: UserSettings = {
  name: "OpenAI",
  description: "OpenAI Settings",
  settings: {
    ["openai/api_key"]: {
      name: "API Key",
      description: "Your OpenAI API key",
      type: "secret",
    },
  },
};
