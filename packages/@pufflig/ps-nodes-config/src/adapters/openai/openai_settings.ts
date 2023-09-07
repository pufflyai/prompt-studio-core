import { UserSettings } from "../../types";

export const OPENAI_API_KEY = "openai/api_key";

export const openAISettings: UserSettings = {
  name: "OpenAI",
  description: "OpenAI Settings",
  settings: {
    [OPENAI_API_KEY]: {
      name: "API Key",
      description: "Your OpenAI API key",
      type: "secret",
    },
  },
};
