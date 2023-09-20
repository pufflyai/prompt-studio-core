import axios from "axios";
import { SERVICE_URL } from "./constants";

interface CreateCompletionInput {
  modelId: string;
  prompt: string;
  config: {
    apiKey: string;
  };
}

export async function createCompletion(input: CreateCompletionInput, onTokenReceived?: (token: string) => void) {
  const { modelId, prompt, config } = input;

  const response = await axios({
    method: "post",
    url: SERVICE_URL,
    responseType: "stream",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${config.apiKey}`,
    },
    data: {
      modelId,
      prompt: prompt,
    },
  });

  const stream = response.data;
  let completion = "";
  let dataPoint = {};

  stream.on("data", (buffer: Buffer) => {
    const chunk = buffer.toString("utf-8");
    const row = chunk.split("\n\n")[0];
    const match = row.match(/^data: (.+)/);
    const data = JSON.parse(match?.[1] || "{}");

    if (!data.dataPoint) {
      onTokenReceived?.(data.modelOutput);
      completion += data.modelOutput;
    }

    if (data.dataPoint) {
      dataPoint = data.dataPoint;
    }
  });

  return new Promise((resolve) => {
    stream.on("end", () => {
      resolve({
        completion,
        dataPoint,
      });
    });
  });
}
