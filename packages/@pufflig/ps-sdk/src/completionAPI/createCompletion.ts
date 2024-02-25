import axios from "axios";
import { getServiceUrl } from "../constants";
import { CreateCompletionInput, Completion, CreateCompletionPayload } from "../types";

export async function createCompletion(input: CreateCompletionInput): Promise<Completion> {
  const { modelId, prompt, apiKey, tags, options, parameters = {} } = input;

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

  if (tags) {
    payload.tags = tags;
  }

  if (options) {
    payload.options = options;
  }

  const response = await axios.post(`${getServiceUrl()}/api/v1/completion/buffered`, payload, requestConfig);

  return response.data;
}
