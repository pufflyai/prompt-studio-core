# Run a workflow

Run a workflow you created in Prompt Studio from within your application given some input values. This endpoint returns the results of the flow. You can retrieve the `deployment_id` of the workflow from the workflow editor.

## `POST` `/v1/workflows/:deployment_id/run`

<Badge type="warning" text="unstable" />

Run a workflow starting from the input node. Values passed in the input field of the request body will be used as the input for the workflow.

### Parameters

| name | type   | description                            |
| ---- | ------ | -------------------------------------- |
| `id` | string | the id of the workflow you want to run |

### Request Body

| name    | type   | description                                                                                                      |
| ------- | ------ | ---------------------------------------------------------------------------------------------------------------- |
| `input` | object | object containing the input values of the workflow. The schema for this object is defined in the workflow editor |

#### Example

```sh
curl -X POST \
     --url "https://api.prompt.studio/v1/workflows/<version_id>/run" \
     --header "Content-Type: application/json" \
     --header "API_KEY: <apiKey>" \
     --data '{ "input": {"prompt": "what is the fastest car in the world?"} }'
```

### Responses

| name  | type           | description                       |
| ----- | -------------- | --------------------------------- |
| `200` | FlowRunSuccess | the workflow was run successfully |
| `404` | {}             | the workflow was not found        |
| `500` | {}             | error running the workflow        |

::: details FlowRunSuccess

The flow completed successfully

> | name     | data type | description                                                                                       |
> | -------- | --------- | ------------------------------------------------------------------------------------------------- |
> | `result` | object    | the results of running the workflow. The schema for this object is defined in the workflow editor |

:::

#### Example

```json
{
  "result": {
    "completion": "The current record holder for the fastest car in the world is the Bugatti Chiron Super Sport 300+, which reached a top speed of 304.77 mph (490.48 km/h) in 2019."
  }
}
```
