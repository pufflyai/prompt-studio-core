import { ModelDefinition } from "@pufflig/ps-types";

export const OPENAI_API_KEY = "openai/api_key";

export const openai_settings = [
  {
    id: OPENAI_API_KEY,
    name: "API Key",
    description: "Your OpenAI API key",
  },
];

export const openai_completion: ModelDefinition = {
  "gpt-3.5-turbo-instruct": {
    modelId: "gpt-3.5-turbo-instruct",
    description:
      "Similar capabilities as text-davinci-003 but compatible with legacy Completions endpoint and not Chat Completions.",
    settings: openai_settings,
    streaming: true,
    parameters: [
      {
        id: "temperature",
        type: "number",
        name: "Temperature",
        max: 2,
        min: 0,
        step: 0.1,
        defaultValue: 0.4,
        description:
          "What sampling temperature to use, between 0 and 2. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic.",
      },
      {
        id: "max_tokens",
        type: "number",
        name: "Max Tokens",
        max: 4097,
        min: 1,
        step: 20,
        defaultValue: 1024,
        description:
          "The maximum number of tokens to generate in the completion. The total length of input tokens and generated tokens is limited by the model's context length.",
      },
      {
        id: "top_p",
        type: "number",
        name: "Top P",
        max: 1,
        min: 0,
        step: 0.1,
        defaultValue: 1,
        description:
          "An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass. So 0.1 means only the tokens comprising the top 10% probability mass are considered.",
      },
      {
        id: "frequency_penalty",
        type: "number",
        name: "Frequency penalty",
        max: 2,
        min: -2,
        step: 0.1,
        defaultValue: 0,
        description:
          "Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model's likelihood to repeat the same line verbatim.",
      },
      {
        id: "presence_penalty",
        type: "number",
        name: "Presence penalty",
        max: 2,
        min: -2,
        step: 0.1,
        defaultValue: 0,
        description:
          "Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far, increasing the model's likelihood to talk about new topics.",
      },
    ],
  },
  "babbage-002": {
    modelId: "babbage-002",
    description: "Replacement for the GPT-3 ada and babbage base models.",
    settings: openai_settings,
    streaming: true,
    parameters: [
      {
        id: "temperature",
        type: "number",
        name: "Temperature",
        max: 2,
        min: 0,
        step: 0.1,
        defaultValue: 0.4,
        description:
          "What sampling temperature to use, between 0 and 2. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic.",
      },
      {
        id: "max_tokens",
        type: "number",
        name: "Max Tokens",
        max: 16384,
        min: 1,
        step: 20,
        defaultValue: 1024,
        description:
          "The maximum number of tokens to generate in the completion. The total length of input tokens and generated tokens is limited by the model's context length.",
      },
      {
        id: "top_p",
        type: "number",
        name: "Top P",
        max: 1,
        min: 0,
        step: 0.1,
        defaultValue: 1,
        description:
          "An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass. So 0.1 means only the tokens comprising the top 10% probability mass are considered.",
      },
      {
        id: "frequency_penalty",
        type: "number",
        name: "Frequency penalty",
        max: 2,
        min: -2,
        step: 0.1,
        defaultValue: 0,
        description:
          "Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model's likelihood to repeat the same line verbatim.",
      },
      {
        id: "presence_penalty",
        type: "number",
        name: "Presence penalty",
        max: 2,
        min: -2,
        step: 0.1,
        defaultValue: 0,
        description:
          "Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far, increasing the model's likelihood to talk about new topics.",
      },
    ],
  },
  "davinci-002": {
    modelId: "davinci-002",
    description: "Replacement for the GPT-3 curie and davinci base models.",
    settings: openai_settings,
    streaming: true,
    parameters: [
      {
        id: "temperature",
        type: "number",
        name: "Temperature",
        max: 2,
        min: 0,
        step: 0.1,
        defaultValue: 0.4,
        description:
          "What sampling temperature to use, between 0 and 2. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic.",
      },
      {
        id: "max_tokens",
        type: "number",
        name: "Max Tokens",
        max: 16384,
        min: 1,
        step: 20,
        defaultValue: 1024,
        description:
          "The maximum number of tokens to generate in the completion. The total length of input tokens and generated tokens is limited by the model's context length.",
      },
      {
        id: "top_p",
        type: "number",
        name: "Top P",
        max: 1,
        min: 0,
        step: 0.1,
        defaultValue: 1,
        description:
          "An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass. So 0.1 means only the tokens comprising the top 10% probability mass are considered.",
      },
      {
        id: "frequency_penalty",
        type: "number",
        name: "Frequency penalty",
        max: 2,
        min: -2,
        step: 0.1,
        defaultValue: 0,
        description:
          "Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model's likelihood to repeat the same line verbatim.",
      },
      {
        id: "presence_penalty",
        type: "number",
        name: "Presence penalty",
        max: 2,
        min: -2,
        step: 0.1,
        defaultValue: 0,
        description:
          "Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far, increasing the model's likelihood to talk about new topics.",
      },
    ],
  },
};

export const openai_chat: ModelDefinition = {
  "gpt-4": {
    modelId: "gpt-4",
    description: "More capable than any GPT-3.5 model, able to do more complex tasks, and optimized for chat.",
    settings: openai_settings,
    streaming: true,
    parameters: [
      {
        id: "temperature",
        type: "number",
        name: "Temperature",
        max: 2,
        min: 0,
        step: 0.1,
        defaultValue: 0.4,
        description:
          "What sampling temperature to use, between 0 and 2. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic.",
      },
      {
        id: "max_tokens",
        type: "number",
        name: "Max Tokens",
        max: 8192,
        min: 1,
        step: 20,
        defaultValue: 1024,
        description:
          "The maximum number of tokens to generate in the completion. The total length of input tokens and generated tokens is limited by the model's context length.",
      },
      {
        id: "top_p",
        type: "number",
        name: "Top P",
        max: 1,
        min: 0,
        step: 0.1,
        defaultValue: 1,
        description:
          "An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass. So 0.1 means only the tokens comprising the top 10% probability mass are considered.",
      },
      {
        id: "frequency_penalty",
        type: "number",
        name: "Frequency penalty",
        max: 2,
        min: -2,
        step: 0.1,
        defaultValue: 0,
        description:
          "Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model's likelihood to repeat the same line verbatim.",
      },
      {
        id: "presence_penalty",
        type: "number",
        name: "Presence penalty",
        max: 2,
        min: -2,
        step: 0.1,
        defaultValue: 0,
        description:
          "Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far, increasing the model's likelihood to talk about new topics.",
      },
    ],
  },
  "gpt-4-32k": {
    modelId: "gpt-4-32k",
    description: "Same capabilities as the standard gpt-4 mode but with 4x the context length. ",
    settings: openai_settings,
    streaming: true,
    parameters: [
      {
        id: "temperature",
        type: "number",
        name: "Temperature",
        max: 2,
        min: 0,
        step: 0.1,
        defaultValue: 0.4,
        description:
          "What sampling temperature to use, between 0 and 2. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic.",
      },
      {
        id: "max_tokens",
        type: "number",
        name: "Max Tokens",
        max: 32768,
        min: 1,
        step: 20,
        defaultValue: 1024,
        description:
          "The maximum number of tokens to generate in the completion. The total length of input tokens and generated tokens is limited by the model's context length.",
      },
      {
        id: "top_p",
        type: "number",
        name: "Top P",
        max: 1,
        min: 0,
        step: 0.1,
        defaultValue: 1,
        description:
          "An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass. So 0.1 means only the tokens comprising the top 10% probability mass are considered.",
      },
      {
        id: "frequency_penalty",
        type: "number",
        name: "Frequency penalty",
        max: 2,
        min: -2,
        step: 0.1,
        defaultValue: 0,
        description:
          "Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model's likelihood to repeat the same line verbatim.",
      },
      {
        id: "presence_penalty",
        type: "number",
        name: "Presence penalty",
        max: 2,
        min: -2,
        step: 0.1,
        defaultValue: 0,
        description:
          "Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far, increasing the model's likelihood to talk about new topics.",
      },
    ],
  },
  "gpt-3.5-turbo": {
    modelId: "gpt-3.5-turbo",
    description: "Most capable GPT-3.5 model and optimized for chat at 1/10th the cost of text-davinci-003.",
    settings: openai_settings,
    streaming: true,
    parameters: [
      {
        id: "temperature",
        type: "number",
        name: "Temperature",
        max: 2,
        min: 0,
        step: 0.1,
        defaultValue: 0.4,
        description:
          "What sampling temperature to use, between 0 and 2. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic.",
      },
      {
        id: "max_tokens",
        type: "number",
        name: "Max Tokens",
        max: 4097,
        min: 1,
        step: 20,
        defaultValue: 1024,
        description:
          "The maximum number of tokens to generate in the completion. The total length of input tokens and generated tokens is limited by the model's context length.",
      },
      {
        id: "top_p",
        type: "number",
        name: "Top P",
        max: 1,
        min: 0,
        step: 0.1,
        defaultValue: 1,
        description:
          "An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass. So 0.1 means only the tokens comprising the top 10% probability mass are considered.",
      },
      {
        id: "frequency_penalty",
        type: "number",
        name: "Frequency penalty",
        max: 2,
        min: -2,
        step: 0.1,
        defaultValue: 0,
        description:
          "Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model's likelihood to repeat the same line verbatim.",
      },
      {
        id: "presence_penalty",
        type: "number",
        name: "Presence penalty",
        max: 2,
        min: -2,
        step: 0.1,
        defaultValue: 0,
        description:
          "Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far, increasing the model's likelihood to talk about new topics.",
      },
    ],
  },
  "gpt-3.5-turbo-16k": {
    modelId: "gpt-3.5-turbo-16k",
    description: "Same capabilities as the standard gpt-3.5-turbo model but with 4 times the context.",
    settings: openai_settings,
    streaming: true,
    parameters: [
      {
        id: "temperature",
        type: "number",
        name: "Temperature",
        max: 2,
        min: 0,
        step: 0.1,
        defaultValue: 0.4,
        description:
          "What sampling temperature to use, between 0 and 2. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic.",
      },
      {
        id: "max_tokens",
        type: "number",
        name: "Max Tokens",
        max: 16385,
        min: 1,
        step: 20,
        defaultValue: 1024,
        description:
          "The maximum number of tokens to generate in the completion. The total length of input tokens and generated tokens is limited by the model's context length.",
      },
      {
        id: "top_p",
        type: "number",
        name: "Top P",
        max: 1,
        min: 0,
        step: 0.1,
        defaultValue: 1,
        description:
          "An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass. So 0.1 means only the tokens comprising the top 10% probability mass are considered.",
      },
      {
        id: "frequency_penalty",
        type: "number",
        name: "Frequency penalty",
        max: 2,
        min: -2,
        step: 0.1,
        defaultValue: 0,
        description:
          "Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model's likelihood to repeat the same line verbatim.",
      },
      {
        id: "presence_penalty",
        type: "number",
        name: "Presence penalty",
        max: 2,
        min: -2,
        step: 0.1,
        defaultValue: 0,
        description:
          "Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far, increasing the model's likelihood to talk about new topics.",
      },
    ],
  },
};

export const openai_embedding: ModelDefinition = {
  "text-embedding-ada-002": {
    modelId: "text-embedding-ada-002",
    description: "Designed to replace the previous 16 first-generation embedding models at a fraction of the cost",
    settings: openai_settings,
    streaming: true,
    parameters: [],
  },
};
