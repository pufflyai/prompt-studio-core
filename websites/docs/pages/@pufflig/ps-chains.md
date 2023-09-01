---
title: &title "@pufflig/ps-chains"
description: &description "@pufflig/ps-chains API reference"
head:
  - ["meta", { property: "og:title", content: *title }]
  - ["meta", { name: "twitter:title", content: *title }]
  - ["meta", { name: "twitter:description", content: *description }]
outline: deep
---

# @pufflig/ps-chains

[![Version](https://img.shields.io/npm/v/@pufflig/ps-chains?style=flat&colorA=000000&colorB=000000)](https://www.npmjs.com/package/@pufflig/ps-chains)

A dataflow engine written in NodeJS to run your no-code projects. A dataflow definition is a list of nodes connected with each other, that describe how your no-code project should work. Each node provides several lifecycle functions that the dataflow engine can use to update the state of the project. Learn more about the lifecycle functions [here](#actions).

## `Chain`

Contains the different types of nodes used in the chain, the `definition` of the chain (how nodes are connected to each other) and the `state` of the chain (the values in each node).

::: details `nodeTypes`

> | name        | type     | data type                                        | description          |
> | ----------- | -------- | ------------------------------------------------ | -------------------- |
> | <NODE_TYPE> | required | Record<string,[NodeDefinition](#nodedefinition)> | definition of a node |

:::

::: details `definition`

> | name    | type     | data type                              | description                           |
> | ------- | -------- | -------------------------------------- | ------------------------------------- |
> | `edges` | required | Record<string,[ChainEdge](#chainedge)> | connection between nodes in the chain |
> | `nodes` | required | Record<string,[ChainNode](#chainnode)> | nodes in the chain                    |

:::

::: details `state`

> | name      | type     | data type               |
> | --------- | -------- | ----------------------- |
> | <NODE_ID> | required | [NodeState](#nodestate) |

:::

::: details example

```ts
const chain = {
  nodeTypes: {
    numberNode: {
      name: "Number",
      parameters: [],
      inputs: [
        {
          name: "number",
          type: "number",
          defaultValue: 0,
          description: "Number input",
          id: "number",
        },
      ],
      outputs: [
        {
          name: "number",
          type: "number",
          defaultValue: 0,
          description: "Number input",
          id: "number",
        },
      ],
      execute: async (i) => i,
      mapInput: async (i) => i,
    },
    additionNode: {
      name: "Addition",
      parameters: [],
      inputs: [
        {
          name: "number1",
          type: "number",
          defaultValue: 0,
          description: "Number input",
          id: "number1",
        },
        {
          name: "number2",
          type: "number",
          defaultValue: 0,
          description: "Number input",
          id: "number2",
        },
      ],
      outputs: [
        {
          name: "sum",
          type: "number",
          defaultValue: 0,
          description: "Sum of two numbers",
          id: "sum",
        },
      ],
      execute: async ({ number1, number2 }: any) => ({ sum: (number1 || 0) + (number2 || 0) }),
      mapInput: async (i) => i,
    },
  },
  definition: {
    edges: {
      e1: {
        id: "e1",
        source: "n1",
        target: "n3",
        sourceHandle: "number",
        targetHandle: "number1",
      },
      e2: {
        id: "e2",
        source: "n2",
        target: "n3",
        sourceHandle: "number",
        targetHandle: "number2",
      },
    },
    nodes: {
      n1: {
        id: "n1",
        type: "numberNode",
        editor: {
          position: { x: 0, y: 0 },
        },
      },
      n2: {
        id: "n2",
        type: "numberNode",
        editor: {
          position: { x: 0, y: 0 },
        },
      },
      n3: {
        id: "n3",
        type: "additionNode",
        autorun: true,
        editor: {
          position: { x: 0, y: 0 },
        },
      },
    },
  },
  state: {
    n1: {
      status: "idle",
      input: {
        number: 1,
      },
    },
    n2: {
      status: "idle",
      input: {
        number: 1,
      },
    },
    n3: {
      status: "idle",
      input: {
        number1: 1,
        number2: 1,
      },
    },
  },
};
```

:::

## `NodeDefinition`

Definition of a node. A node is some logic that can run given some input data and generate some output.

::: details `schema`

> | name          | type     | data type             | description             |
> | ------------- | -------- | --------------------- | ----------------------- |
> | `name`        | required | string                | name of the node        |
> | `description` | optional | string                | description of the node |
> | `type`        | required | string                | type of node            |
> | `execute`     | required | [function](#execute)  |
> | `mapInput`    | required | [function](#mapInput) |

:::

### `execute()`

Generate an output given the node input.

```ts
function execute(variable: Record<string, any>): Promise<Record<sring, any>>;
```

::: details Parameters

> | name       | type     | data type           | description |
> | ---------- | -------- | ------------------- | ----------- |
> | `variable` | required | Record<string, any> |

:::

::: details Returns

> | data type                     | description |
> | ----------------------------- | ----------- |
> | `Promise<Record<sring, any>>` |

:::

### `mapInput()`

```ts
function mapInput(variable: string): Promise<string>;
```

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

## `ChainNode`

Definition for some logic that can run given some input data and generate some output.

::: details `schema`

> | name      | type     | data type | description                                                   |
> | --------- | -------- | --------- | ------------------------------------------------------------- |
> | `id`      | required | string    |                                                               |
> | `type`    | required | string    | type of node                                                  |
> | `autorun` | optional | boolean   | automatically run this node when the inputs have been updated |
> | `editor`  | optional | object    |

## `ChainEdge`

A connection between two handles on two different nodes. Used to map the output from one node to the input of another

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
> | `resolver`  | optional | resolve()                              |
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

Callback that triggers after the input state of a node was updated. This happens after the node's `mapInput` method ran.

::: details Parameters

> | name       | type     | data type                                 |
> | ---------- | -------- | ----------------------------------------- |
> | `nodeId`   | required | string                                    |
> | `newInput` | required | Record<string, [ParamValue](#paramvalue)> |

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

Update the input values of a node, without executing the node. This method triggers the `mapInput` node lifecycle function.

::: details Parameters

> | name      | type     | data type                            | description |
> | --------- | -------- | ------------------------------------ | ----------- |
> | `nodeId`  | required | string                               |
> | `input`   | required | Record<string, [ParamValue](#chain)> |
> | `chain`   | required | [Chain](#chain)                      |
> | `options` | required | [RunOptions](#runoptions)            |

:::

::: details Returns

> | data type                          |
> | ---------------------------------- |
> | Promise<Record<string, NodeState>> |

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

Run the chain from a node. Run the `mapInput` function on the new inputs, Update the node inputs, run the `execute`
function on the new inputs

::: details Parameters

> | name      | type     | data type                                 | description |
> | --------- | -------- | ----------------------------------------- | ----------- |
> | `nodeId`  | required | string                                    |
> | `input`   | required | Record<string, [ParamValue](#paramvalue)> |
> | `chain`   | required | [Chain](#chain)                           |
> | `options` | required | [RunOptions](#runoptions)                 |

:::

::: details Returns

> | data type                                        |
> | ------------------------------------------------ |
> | [Promise<Record<string, NodeState>>](#nodestate) |

:::

## ParamValue

## NodeState
