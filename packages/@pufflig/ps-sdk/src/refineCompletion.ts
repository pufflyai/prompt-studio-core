import axios from "axios";
import { getServiceUrl } from "./constants";

interface RefineCompletionInput {
  apiKey: string;
  modelId: string;
  prompt: string;
  format: string;
  document: string;
  parameters?: Record<string, any>;
  config?: Record<string, any>;
  options?: {
    track?: boolean;
    cache?: boolean;
  };
}

interface Completion {
  result: string;
  datapoints?: {
    model_output: string;
    model_input: string;
    model_id: string;
  }[];
}

interface RefineCompletionPayload {
  modelId: string;
  prompt: string;
  format: string;
  document: string;
  parameters?: Record<string, any>;
  config?: Record<string, any>;
  options?: {
    track?: boolean;
    cache?: boolean;
  };
}

/**
 * Loop a prompt over documents of variable size, refining the outcome for each chunk.
 *
 * @param input.format - The value to be refined, e.g. a json or csv table
 * @param input.document - The document to be processed
 * @param input.parameters - Parameters to be passed to the model
 * @param input.modelId - Name of the LLM to be used
 *
 * @returns The completion
 */
export async function refineCompletion(input: RefineCompletionInput): Promise<Completion> {
  const { modelId, prompt, format, document, apiKey, config, options, parameters = {} } = input;

  const payload: RefineCompletionPayload = {
    modelId,
    prompt,
    format,
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

  const response = await axios.post(`${getServiceUrl()}/api/v1/completion/looped`, payload, requestConfig);

  return response.data;
}
