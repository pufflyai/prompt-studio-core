---
outline: deep
---

# @pufflig/ps-chains

[![Version](https://img.shields.io/npm/v/@pufflig/ps-chains?style=flat&colorA=000000&colorB=000000)](https://www.npmjs.com/package/@pufflig/ps-chains)

A dataflow engine written in NodeJS to run your no-code projects. A dataflow definition is a list of nodes connected with each other, that describe how your no-code project should work. Each node provides several lifecycle functions that the dataflow engine can use to update the state of the project. Learn more about the lifecycle functions [here]().

## `Chain`

Contains the `definition` of the chain (how nodes are connected to each other) and the `state` of the chain (the values in each node).

::: details `definition`

### Chain Definition

> | name    | type     | data type                              |
> | ------- | -------- | -------------------------------------- |
> | `edges` | required | Record<string,[ChainEdge](#chainedge)> |
> | `nodes` | required | Record<string,[ChainNode](#chainnode)> |

:::

::: details `state`

### Chain State

A record of nodes indexes by their nodeId.

> | name      | type     | data type     |
> | --------- | -------- | ------------- |
> | <NODE_ID> | required | [NodeState]() |

:::

## `ChainNode`

::: warning INCOMPLETE

This function is not documented yet.

:::

## `ChainEdge`

An edge is a connection between two handles on two different nodes.

::: details `schema`

> | name           | type     | data type |
> | -------------- | -------- | --------- |
> | `id`           | required | string    |
> | `source`       | required | string    |
> | `target`       | required | string    |
> | `sourceHandle` | required | string    |
> | `targetHandle` | required | string    |

:::

## `RunOptions`

This object contains callbacks that trigger at different times in the node lifecycle.

::: details `schema`

> | name        | type     | data type                              |
> | ----------- | -------- | -------------------------------------- |
> | `resolver`  | optional | [resolver()]()                         |
> | `callbacks` | optional | [Record<string, Callback>](#callbacks) |

:::

### `resolver()`

```ts
function resolver(variable: string): Promise<string>;
```

A function to resolve references in the node input before executing the node. This can be useful to insert secrets or long text just for the node execution without persisting this data in the chain state.

::: details Parameters

> | name       | type     | data type | description |
> | ---------- | -------- | --------- | ----------- |
> | `variable` | required | string    |

:::

::: details Returns

> | data type         | description |
> | ----------------- | ----------- |
> | `Promise<string>` |

:::

## `Callbacks`

You can provide several callbacks that trigger at different times in the lifecycle of a node.

### `onInputChange()`

```ts
function onInputChange(nodeId: string, newInput: Record<string, ParamValue>): void;
```

Callback that triggers after the input state of a node was updated. This happens after the node's `parseInput` method ran.

::: details Parameters

> | name       | type     | data type                      |
> | ---------- | -------- | ------------------------------ |
> | `nodeId`   | required | string                         |
> | `newInput` | required | Record<string, [ParamValue]()> |

:::

---

### `onNodeError()`

::: warning INCOMPLETE

This function is not finalized yet.

:::

```ts
function onNodeError(nodeId: string, error: Error): void;
```

Triggers if one of the lifecycle functions of a node throws and error.

## Actions

These are the functions `@pufflig/ps-chains` provides to update the state of a chain.

### `updateNodeInput()`

```ts
function updateNodeInput(
  nodeId: string,
  input: Record<string, ParamValue>,
  chain: Chain,
  options?: RunOptions
): Promise<Record<string, NodeState>>;
```

Update the input values of a node, without executing the node. This method triggers the `parseInput` node lifecycle function.

::: details Parameters

> | name      | type     | data type                      | description |
> | --------- | -------- | ------------------------------ | ----------- |
> | `nodeId`  | required | string                         |
> | `input`   | required | Record<string, [ParamValue]()> |
> | `chain`   | required | [Chain](#chain)                |
> | `options` | required | [RunOptions](#runoptions)      |

:::

::: details Returns

> | data type                              |
> | -------------------------------------- |
> | [Promise<Record<string, NodeState>>]() |

:::

### `runFromNode()`

```ts
function runFromNode(
  nodeId: string,
  input: Record<string, ParamValue>,
  chain: Chain,
  options?: RunOptions
): Promise<Record<string, NodeState>>;
```

Run the chain from a node. Run the `parseInput` function on the new inputs, Update the node inputs, run the `execute`
function on the new inputs

::: details Parameters

> | name      | type     | data type                      | description |
> | --------- | -------- | ------------------------------ | ----------- |
> | `nodeId`  | required | string                         |
> | `input`   | required | Record<string, [ParamValue]()> |
> | `chain`   | required | [Chain](#chain)                |
> | `options` | required | [RunOptions](#runoptions)      |

:::

::: details Returns

> | data type                              |
> | -------------------------------------- |
> | [Promise<Record<string, NodeState>>]() |

:::
