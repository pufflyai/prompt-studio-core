# @pufflig/ps-chains

[![Version](https://img.shields.io/npm/v/@pufflig/ps-chains?style=flat&colorA=000000&colorB=000000)](https://www.npmjs.com/package/@pufflig/ps-chains)

Flow runner that updates the state of nodes based on how they are connected with each other.

## Documentation

You can find the documentation for this package [here]().

## Storybook

You can preview the chain in a storybook by running:

```
yarn storybook
```

```ts
const chain = {
  definition: {
    nodes: {
      [nodeID]: {
        config,
        execute,
        parseInput,
      },
    },
    edges: {
      [edgeID]: {},
    },
  },
  state: {
    nodes: {
      [nodeID]: {},
    },
  },
};

const input = {};

const options = {
  resolveVariables,
  callbacks: {
    onInputChange,
    onNodeError,
  },
};

runFromNode(nodeId, input, chain, options);
```
