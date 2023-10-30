import axios from "axios";
import { getServiceUrl } from "./constants";

interface MapCompletionInput {
  apiKey: string;
  modelId: string;
  prompt: string;
  document: string;
  parameters?: Record<string, any>;
  config?: Record<string, any>;
  options?: {
    track?: boolean;
    cache?: boolean;
  };
}

interface Completion {
  datapoints?: {
    model_output: string;
    model_input: string;
    model_id: string;
  };
}

interface MapCompletionPayload {
  modelId: string;
  prompt: string;
  document: string;
  parameters?: Record<string, any>;
  config?: Record<string, any>;
  options?: {
    track?: boolean;
    cache?: boolean;
  };
}

/**
 * Map a prompt over a document of variable length. Return a completion for each chunk.
 *
 * @param input.document - The document to be processed
 * @param input.parameters - Parameters to be passed to the model
 * @param input.modelId - Name of the LLM to be used
 *
 * @returns The completion
 */
export async function mapCompletion(input: MapCompletionInput): Promise<{ completions: Completion[] }> {
  const { modelId, prompt, document, apiKey, config, options, parameters = {} } = input;

  const payload: MapCompletionPayload = {
    modelId,
    prompt,
    document,
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

  const response = await axios.post(`${getServiceUrl()}/api/v1/completion/mapped`, payload, requestConfig);

  return response.data;
}
