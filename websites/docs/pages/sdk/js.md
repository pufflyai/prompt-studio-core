# Javascript SDK v1.0

Our Javascript SDK is a wrapper around our Rest API. You can use it to integrate the workflows you build into your NodeJS codebase.

## Setup the SDK

You can install the sdk using npm

```
npm i @pufflig/ps-sdk
```

or yarn

```
npm yarn @pufflig/ps-sdk
```

## Usage

You can quickly start making requests with the following code snippet:

```ts
import { runInstruction } from "@pufflig/ps-sdk";

const { datapoint } = await runInstruction({
  apiKey: YOUR_PROMPT_STUDIO_API_KEY,
  modelId: "gpt-3.5-turbo-instruct",
  prompt: "what is the fastest car?",
  parameters: {
    temperature: 0,
  },
});

console.log(datapoint.modelOutput); // As of 2021, the fastest car in the world is the Bugatti Chiron Super Sport 300+, with a top speed of 304 mph.
```

You can find your api key in prompt studio under the "API" tab of the tool editor. Each workspace in prompt studio will have its own key, this allows you to

## Datapoints

Datapoints track completions you or your users created, these datapoints can later be used to finetune LLMs to better serve your problem.

## Available Models

- gpt-3.5-turbo-instruct
- gpt-4-1106-preview
- meta-llama/llama-2-13b-chat
- anthropic/claude-2

Each model accepts different parameters.

## API Reference

## `runInstruction(RunInstructionInput)`

Generate a completion given a prompt. If the prompt is

Input

> | name       | type     | data type              | description                                     |
> | ---------- | -------- | ---------------------- | ----------------------------------------------- |
> | apiKey     | required | string                 | Your prompt studio api key                      |
> | modelId    | required | string                 | The model to call                               |
> | prompt     | required | string                 | The prompt to provide to the language model     |
> | parameters | optional | Record<string, string> | The parameters to provide to the language model |
> | options    | optional | [Options](#options)    | Request options                                 |

Return

> | name      | data type                           |
> | --------- | ----------------------------------- |
> | datapoint | [Datapoint](#datapoint) / undefined |

## `runWorkflow(RunWorkflowInput)`

Run a deployed workflow on prompt studio.

Inputs

> | name         | type     | data type           | description                |
> | ------------ | -------- | ------------------- | -------------------------- |
> | apiKey       | required | string              | Your prompt studio api key |
> | deploymentId | required | string              | Your prompt studio api key |
> | input        | required | Record<string, any> | Input to a workflow        |
> | options      | optional | [Options](#options) | Request options            |

Return

> | name      | data type                           |
> | --------- | ----------------------------------- |
> | datapoint | [Datapoint](#Datapoint) / undefined |

## `Datapoint`

> | name           | type     | data type           | description                  |
> | -------------- | -------- | ------------------- | ---------------------------- |
> | modelOutput    | optional | string              | Output of the language model |
> | modelInput     | optional | string              | Input to the language model  |
> | workflowInput  | optional | Record<string, any> | Input to a workflow          |
> | workflowOutput | optional | Record<string, any> | Output of a workflow         |
> | modelId        | optional | string              | Id of the model used         |

## `Options`

> | name  | type     | data type | description                                                                      |
> | ----- | -------- | --------- | -------------------------------------------------------------------------------- |
> | cache | optional | boolean   | Return cached value, note some parameters like temperature will invalidate cache |
> | track | optional | boolean   | Track the resulting datapoint                                                    |
