# Run a flow

Run a flow you created on Prompt Studio from within your application given some input values. Returns the results of the flow. You can retrieve the `flow_id` from the flow editor.

## `POST` `/v1/flows/:flow_id/run`

<Badge type="warning" text="coming soon" />

Run the flow starting from the input node.

### Parameters

| name      | type   | description                        |
| --------- | ------ | ---------------------------------- |
| `flow_id` | string | the id of the flow you want to run |

### Request Body

| name | type | description                   |
| ---- | ---- | ----------------------------- |
| ``   |      | the flow was run successfully |

#### Example

```sh
curl -X POST \
     --url "https://app.prompt.studio/v1/flows/<flow_id>/run" \
     --header "Content-Type: application/json" \
     --header "API_KEY: <apiKey>" \
     --data '
{}
```

### Responses

| name  | type           | description                   |
| ----- | -------------- | ----------------------------- |
| `200` | FlowRunSuccess | the flow was run successfully |
| `400` |                | the request is malformed      |
| `404` |                | the flow was not found        |
| `500` |                | error running the flow        |

::: details FlowRunSuccess

> | name | data type | description |
> | ---- | --------- | ----------- |
> | ``   | string    |

:::

#### Example

```json
{}
```

## `POST` `/v1/flows/:flow_id/run/:node_id`

Run the flow starting from any node.
