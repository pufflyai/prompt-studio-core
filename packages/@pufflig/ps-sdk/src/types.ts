import { available_models } from "@pufflig/ps-models";

export interface Datapoint {
  model_output: string;
  model_input: string;
  model_id: string;
}

export interface Completion {
  datapoint?: Datapoint;
}

export interface CreateCompletionInput {
  apiKey: string;
  modelId: (typeof available_models)[number];
  prompt: string;
  parameters?: Record<string, any>;
  tags?: string[];
  options?: {
    track?: boolean;
    cache?: boolean;
  };
}

export interface RunDeploymentInput {
  apiKey: string;
  deploymentId: string;
  deploymentInput: any;
}

export interface RunDeploymentPayload {
  input: any;
}

export interface CreateCompletionPayload {
  modelId: (typeof available_models)[number];
  prompt: string;
  parameters?: Record<string, any>;
  tags?: string[];
  options?: {
    track?: boolean;
    cache?: boolean;
  };
}
