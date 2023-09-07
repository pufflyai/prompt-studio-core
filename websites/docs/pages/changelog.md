---
title: &title Changelog
description: &description Changelog for Prompt Studio packages
head:
  - ["meta", { property: "og:title", content: *title }]
  - ["meta", { name: "twitter:title", content: *title }]
  - ["meta", { name: "twitter:description", content: *description }]
---

# Changelog

**Note**: the API for the Prompt Studio packages will be changing rapidly until we reach v1.0.0"

## 0.17.0

:warning: Breaking changes

### Features

- :warning: **API** [@pufflig/ps-chains] pass `NodeOptions` as parameter to the `execute`, `mapInput` and `getTarget` lifecycle methods. Node options now contains the `prevInput` value as well as `global` values. `global` values are variables common for the entire flow, they can be secrets or other references provided as part of the `runOptions`.
- :warning: **API** [@pufflig/ps-nodes-config] remove `parameters` field as it isn't needed.
- [@pufflig/ps-nodes-config] fix OpenAI model temperatures max

## 0.16.0

:warning: Breaking changes

### Features

- :warning: **API** [@pufflig/ps-chains] rename `parseInput` method to `mapInput`
- **API** [@pufflig/ps-chains] add `getNext` lifecycle method. With this method a node can decide what target execution nodes to run and in what order. This method can be used to create loops / conditionals.
- [@pufflig/ps-nodes] add a node to generate embeddings using the openai api.
- [@pufflig/ps-nodes] add a node to run loops

## 0.15.0

:warning: Breaking changes

### Features

- :warning: **API** [@pufflig/ps-chains] allow user to specify in which mode to run a flow. The mode can be `dataflow` which will not run executable nodes and `controlflow` which will run executable nodes. The default mode is `controlflow`.

## 0.13.0

:warning: Breaking changes

### Features

- :warning: **API** [@pufflig/ps-chains] add the concept of execution connections. When creating flows you have now
  more control over the order in which nodes execute. This replaces the autorun feature.
- :warning: **API** [@pufflig/ps-chains] the `runFromNode` method is now called `runFlow` and has a slightly different call signature

## 0.8.0

:warning: Breaking changes

### Features

- :warning: **API** [@pufflig/ps-chains] allows node to interrupt execution by returning null
- :warning: **API** [@pufflig/ps-chains] previous input is also passed into the execute method
- :warning: **API** [@pufflig/ps-chains] update the `chatMessage` and `chat` type
- **Feature** [@pufflig/ps-chains] add the append_to_chat node, useful to append a message to a chat.

## 0.7.0

:warning: Breaking changes

### Features

- :warning: **API** [@pufflig/ps-chains] decouple the dataflow engine from the nodes package
- :warning: **API** [@pufflig/ps-chains] change the format of callbacks
- **API** [@pufflig/ps-chains] add onNodeError callback
- **API** [@pufflig/ps-chains] new parameter allowing to specify a reference resolver
- **Documentation** setup documentation website
