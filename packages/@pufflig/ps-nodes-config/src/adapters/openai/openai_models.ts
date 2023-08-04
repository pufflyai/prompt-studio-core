import { Models } from "../../types";

export const chatModels = {
  defaultModel: "gpt-3.5-turbo",
  models: {
    "gpt-3.5-turbo": {
      modelId: "gpt-3.5-turbo",
      parameters: {
        temperature: {
          name: "Temperature",
          max: 1,
          min: 0,
          step: 0.1,
          default: 0.4,
          description:
            "Controls randomness: Lowering results in less random completions. As the temperature approaches zero, the model will become deterministic and repetitive. Higher temperature results in more random completions.",
        },
        max_tokens: {
          name: "Maximum Length",
          max: 2048,
          min: 1,
          step: 20,
          default: 124,
          description: "The maximum number of tokens to generate.",
        },
        top_p: {
          name: "Top P",
          max: 1,
          min: 0,
          step: 0.1,
          default: 1,
          description:
            "Controls diversity via nucleus sampling: 0.5 means half of all likelihood-weighted options are considered.",
        },
        frequency_penalty: {
          name: "Frequency penalty",
          max: 2,
          min: 0,
          step: 0.01,
          default: 0,
          description:
            "How much to penalize new tokens based on their existing frequency in the text so far. Decreases the model's likelihood to repeat the same line verbatim.",
        },
        presence_penalty: {
          name: "Presence penalty",
          max: 2,
          min: 0,
          step: 0.01,
          default: 0,
          description: "How much to penalize new tokens based on whether they appear in the text so far.",
        },
      },
    },
    "gpt-3.5-turbo-16k": {
      modelId: "gpt-3.5-turbo-16k",
      parameters: {
        temperature: {
          name: "Temperature",
          max: 1,
          min: 0,
          step: 0.1,
          default: 0.4,
          description:
            "Controls randomness: Lowering results in less random completions. As the temperature approaches zero, the model will become deterministic and repetitive. Higher temperature results in more random completions.",
        },
        max_tokens: {
          name: "Maximum Length",
          max: 16384,
          min: 1,
          step: 20,
          default: 2048,
          description: "The maximum number of tokens to generate.",
        },
        top_p: {
          name: "Top P",
          max: 1,
          min: 0,
          step: 0.1,
          default: 1,
          description:
            "Controls diversity via nucleus sampling: 0.5 means half of all likelihood-weighted options are considered.",
        },
        frequency_penalty: {
          name: "Frequency penalty",
          max: 2,
          min: 0,
          step: 0.01,
          default: 0,
          description:
            "How much to penalize new tokens based on their existing frequency in the text so far. Decreases the model's likelihood to repeat the same line verbatim.",
        },
        presence_penalty: {
          name: "Presence penalty",
          max: 2,
          min: 0,
          step: 0.01,
          default: 0,
          description: "How much to penalize new tokens based on whether they appear in the text so far.",
        },
      },
    },
    "gpt-4": {
      modelId: "gpt-4",
      parameters: {
        temperature: {
          name: "Temperature",
          max: 1,
          min: 0,
          step: 0.1,
          default: 0.4,
          description:
            "Controls randomness: Lowering results in less random completions. As the temperature approaches zero, the model will become deterministic and repetitive. Higher temperature results in more random completions.",
        },
        max_tokens: {
          name: "Maximum Length",
          max: 8192,
          min: 1,
          step: 20,
          default: 2048,
          description: "The maximum number of tokens to generate.",
        },
        top_p: {
          name: "Top P",
          max: 1,
          min: 0,
          step: 0.1,
          default: 1,
          description:
            "Controls diversity via nucleus sampling: 0.5 means half of all likelihood-weighted options are considered.",
        },
        frequency_penalty: {
          name: "Frequency penalty",
          max: 2,
          min: 0,
          step: 0.01,
          default: 0,
          description:
            "How much to penalize new tokens based on their existing frequency in the text so far. Decreases the model's likelihood to repeat the same line verbatim.",
        },
        presence_penalty: {
          name: "Presence penalty",
          max: 2,
          min: 0,
          step: 0.01,
          default: 0,
          description: "How much to penalize new tokens based on whether they appear in the text so far.",
        },
      },
    },
    "gpt-4-32k": {
      modelId: "gpt-4-32k",
      parameters: {
        temperature: {
          name: "Temperature",
          max: 1,
          min: 0,
          step: 0.1,
          default: 0.4,
          description:
            "Controls randomness: Lowering results in less random completions. As the temperature approaches zero, the model will become deterministic and repetitive. Higher temperature results in more random completions.",
        },
        max_tokens: {
          name: "Maximum Length",
          max: 32768,
          min: 1,
          step: 20,
          default: 2048,
          description: "The maximum number of tokens to generate.",
        },
        top_p: {
          name: "Top P",
          max: 1,
          min: 0,
          step: 0.1,
          default: 1,
          description:
            "Controls diversity via nucleus sampling: 0.5 means half of all likelihood-weighted options are considered.",
        },
        frequency_penalty: {
          name: "Frequency penalty",
          max: 2,
          min: 0,
          step: 0.01,
          default: 0,
          description:
            "How much to penalize new tokens based on their existing frequency in the text so far. Decreases the model's likelihood to repeat the same line verbatim.",
        },
        presence_penalty: {
          name: "Presence penalty",
          max: 2,
          min: 0,
          step: 0.01,
          default: 0,
          description: "How much to penalize new tokens based on whether they appear in the text so far.",
        },
      },
    },
  },
};

export const completionModels: Models = {
  defaultModel: "text-davinci-003",
  models: {
    "text-ada-001": {
      modelId: "text-ada-001",
      parameters: {
        temperature: {
          name: "Temperature",
          max: 1,
          min: 0,
          step: 0.1,
          default: 0.4,
          description:
            "Controls randomness: Lowering results in less random completions. As the temperature approaches zero, the model will become deterministic and repetitive. Higher temperature results in more random completions.",
        },
        max_tokens: {
          name: "Maximum Length",
          max: 2048,
          min: 1,
          step: 20,
          default: 124,
          description: "The maximum number of tokens to generate.",
        },
        top_p: {
          name: "Top P",
          max: 1,
          min: 0,
          step: 0.1,
          default: 1,
          description:
            "Controls diversity via nucleus sampling: 0.5 means half of all likelihood-weighted options are considered.",
        },
        frequency_penalty: {
          name: "Frequency penalty",
          max: 2,
          min: 0,
          step: 0.01,
          default: 0,
          description:
            "How much to penalize new tokens based on their existing frequency in the text so far. Decreases the model's likelihood to repeat the same line verbatim.",
        },
        presence_penalty: {
          name: "Presence penalty",
          max: 2,
          min: 0,
          step: 0.01,
          default: 0,
          description: "How much to penalize new tokens based on whether they appear in the text so far.",
        },
      },
    },
    "text-babbage-001": {
      modelId: "text-babbage-001",
      parameters: {
        temperature: {
          name: "Temperature",
          max: 1,
          min: 0,
          step: 0.1,
          default: 0.4,
          description:
            "Controls randomness: Lowering results in less random completions. As the temperature approaches zero, the model will become deterministic and repetitive. Higher temperature results in more random completions.",
        },
        max_tokens: {
          name: "Maximum Length",
          max: 2048,
          min: 1,
          step: 20,
          default: 124,
          description: "The maximum number of tokens to generate.",
        },
        top_p: {
          name: "Top P",
          max: 1,
          min: 0,
          step: 0.1,
          default: 1,
          description:
            "Controls diversity via nucleus sampling: 0.5 means half of all likelihood-weighted options are considered.",
        },
        frequency_penalty: {
          name: "Frequency penalty",
          max: 2,
          min: 0,
          step: 0.01,
          default: 0,
          description:
            "How much to penalize new tokens based on their existing frequency in the text so far. Decreases the model's likelihood to repeat the same line verbatim.",
        },
        presence_penalty: {
          name: "Presence penalty",
          max: 2,
          min: 0,
          step: 0.01,
          default: 0,
          description: "How much to penalize new tokens based on whether they appear in the text so far.",
        },
      },
    },
    "text-curie-001": {
      modelId: "text-curie-001",
      parameters: {
        temperature: {
          name: "Temperature",
          max: 1,
          min: 0,
          step: 0.1,
          default: 0.4,
          description:
            "Controls randomness: Lowering results in less random completions. As the temperature approaches zero, the model will become deterministic and repetitive. Higher temperature results in more random completions.",
        },
        max_tokens: {
          name: "Maximum Length",
          max: 2048,
          min: 1,
          step: 20,
          default: 124,
          description: "The maximum number of tokens to generate.",
        },
        top_p: {
          name: "Top P",
          max: 1,
          min: 0,
          step: 0.1,
          default: 1,
          description:
            "Controls diversity via nucleus sampling: 0.5 means half of all likelihood-weighted options are considered.",
        },
        frequency_penalty: {
          name: "Frequency penalty",
          max: 2,
          min: 0,
          step: 0.01,
          default: 0,
          description:
            "How much to penalize new tokens based on their existing frequency in the text so far. Decreases the model's likelihood to repeat the same line verbatim.",
        },
        presence_penalty: {
          name: "Presence penalty",
          max: 2,
          min: 0,
          step: 0.01,
          default: 0,
          description: "How much to penalize new tokens based on whether they appear in the text so far.",
        },
      },
    },
    "text-davinci-003": {
      modelId: "text-davinci-003",
      parameters: {
        temperature: {
          name: "Temperature",
          max: 1,
          min: 0,
          step: 0.1,
          default: 0.4,
          description:
            "Controls randomness: Lowering results in less random completions. As the temperature approaches zero, the model will become deterministic and repetitive. Higher temperature results in more random completions.",
        },
        max_tokens: {
          name: "Maximum Length",
          max: 2048,
          min: 1,
          step: 20,
          default: 124,
          description: "The maximum number of tokens to generate.",
        },
        top_p: {
          name: "Top P",
          max: 1,
          min: 0,
          step: 0.1,
          default: 1,
          description:
            "Controls diversity via nucleus sampling: 0.5 means half of all likelihood-weighted options are considered.",
        },
        frequency_penalty: {
          name: "Frequency penalty",
          max: 2,
          min: 0,
          step: 0.01,
          default: 0,
          description:
            "How much to penalize new tokens based on their existing frequency in the text so far. Decreases the model's likelihood to repeat the same line verbatim.",
        },
        presence_penalty: {
          name: "Presence penalty",
          max: 2,
          min: 0,
          step: 0.01,
          default: 0,
          description: "How much to penalize new tokens based on whether they appear in the text so far.",
        },
      },
    },
  },
};

export const embeddingModels = {
  defaultModel: "text-embedding-ada-002",
  models: {
    "text-embedding-ada-002": {
      modelId: "text-embedding-ada-002",
      parameters: {},
    },
  },
};
