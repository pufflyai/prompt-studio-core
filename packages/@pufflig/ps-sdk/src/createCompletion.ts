import axios from "axios";
import { getServiceUrl } from "./constants";

interface CreateCompletionInput {
  apiKey: string;
  modelId: string;
  prompt: string;
  parameters?: Record<string, any>;
  config?: Record<string, any>;
  options?: {
    track?: boolean;
    cache?: boolean;
  };
}

interface Completion {
  datapoint?: {
    model_output: string;
    model_input: string;
    model_id: string;
  };
}

interface CreateCompletionPayload {
  modelId: string;
  prompt: string;
  parameters?: Record<string, any>;
  config?: Record<string, any>;
  options?: {
    track?: boolean;
    cache?: boolean;
  };
}

export async function createCompletion(input: CreateCompletionInput): Promise<Completion> {
  const { modelId, prompt, apiKey, config, options, parameters = {} } = input;

  const payload: CreateCompletionPayload = {
    modelId,
    prompt,
    parameters,
  };

  const requestConfig = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
  };

  if (config) {
    payload.config = config;
  }

  if (options) {
    payload.options = options;
  }

  const response = await axios.post(`${getServiceUrl()}/api/v1/completion/buffered`, payload, requestConfig);

  return response.data;
}
