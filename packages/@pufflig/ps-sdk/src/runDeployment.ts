import axios from "axios";
import { getServiceUrl } from "./constants";
import { Completion, RunDeploymentInput, RunDeploymentPayload } from "./types";

export async function runDeployment(input: RunDeploymentInput): Promise<Completion> {
  const { apiKey, deploymentId, deploymentInput } = input;

  const payload: RunDeploymentPayload = {
    input: deploymentInput,
  };

  const requestConfig = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
  };

  const response = await axios.post(
    `${getServiceUrl()}/api/v1/instructions/${deploymentId}/run`,
    payload,
    requestConfig
  );

  return response.data;
}
