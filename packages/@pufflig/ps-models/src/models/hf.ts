import { ModelDefinition } from "../types";

export const HF_ACCESS_TOKEN = "hf/access_token";

export const hf_settings = [
  {
    id: HF_ACCESS_TOKEN,
    name: "User Access Tokens",
    description: "Access tokens programmatically authenticate your identity to the Hugging Face Hub.",
  },
];

export const hf_completion: ModelDefinition = {
  gpt2: {
    modelId: "gpt2",
    description: "",
    settings: hf_settings,
    streaming: false,
    contextLength: 512,
    maxTokens: 1024,
    parameters: [
      {
        id: "temperature",
        type: "number",
        name: "Temperature",
        max: 100.0,
        min: 0,
        step: 1,
        defaultValue: 10,
        description:
          "The temperature of the sampling operation. 1 means regular sampling, 0 means always take the highest score, 100.0 is getting closer to uniform probability.",
      },
      {
        id: "max_new_tokens",
        type: "number",
        name: "Max New Tokens",
        max: 250,
        min: 0,
        step: 1,
        defaultValue: 10,
        description:
          "The amount of new tokens to be generated, this does not include the input length it is a estimate of the size of generated text you want. Each new tokens slows down the request, so look for balance between response times and length of text generated.",
      },
    ],
  },
};
