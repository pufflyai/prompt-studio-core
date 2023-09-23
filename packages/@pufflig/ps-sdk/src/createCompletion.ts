import axios, { AxiosRequestConfig } from "axios";
import { getServiceUrl } from "./constants";
import { Datapoint } from "./types";

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

interface Callbacks {
  onTokenReceived?: (token: string) => void;
}

interface Completion {
  datapoint?: Datapoint;
}

export async function createCompletion(input: CreateCompletionInput, callbacks?: Callbacks): Promise<Completion> {
  const { modelId, prompt, apiKey, config, options } = input;

  const payload: AxiosRequestConfig = {
    method: "post",
    url: getServiceUrl(),
    responseType: "stream",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    data: {
      modelId,
      prompt: prompt,
    },
  };

  if (config) {
    payload.data.config = config;
  }

  if (options) {
    payload.data.options = options;
  }

  const response = await axios(payload);

  const stream = response.data;
  let completion = "";
  let result = {};

  stream.on("data", (buffer: Buffer) => {
    const chunk = buffer.toString("utf-8");
    const row = chunk.split("\n\n")[0];
    const match = row.match(/^data: (.+)/);
    const data = JSON.parse(match?.[1] || "{}");
    callbacks?.onTokenReceived?.(data.datapoint.model_output);
    completion += data.datapoint.model_output;
    result = data;
  });

  return new Promise((resolve, reject) => {
    stream.on("end", () => {
      resolve(result);
    });

    stream.on("error", (error: Error) => {
      reject(error);
    });
  });
}
