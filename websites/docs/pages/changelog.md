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

## 0.19.6

### Features

- **API** [@pufflig/ps-nodes] add the `prompt` node. This node will replace the text template node. It doesn't require a "variables" input anymore, instead it derives it's input fields from the template content.
- **API** [@pufflig/ps-node-configs] add the optional `getInputDefinition` method to nodes. This is not a lifecycle function. This function can be used to derive an input definition (what input fields a node has) given the values provided in the input. This method can be used for example to show input fields given a template.

## 0.19.5

### Features

- [@pufflig/ps-node-configs] add api status to node config. A status can be: "experimental", "deprecated", "stable"

## 0.18.0

:warning: Breaking changes

**THESE CHANGES WILL BREAK EXISTING WORKFLOWS**

### Features

- :warning: **API** [@pufflig/ps-nodes] rename object node to something less technical
- :warning: **API** [@pufflig/ps-nodes] rename handlebar template node
- :warning: **API** [@pufflig/ps-nodes] rename append_to_chat to add_message
- :warning: **API** [@pufflig/ps-nodes] change the API of the message node
- **API** [@pufflig/ps-nodes] add model data node
- **API** [@pufflig/ps-nodes] add number data node
- **API** [@pufflig/ps-nodes] add list data node
- **API** [@pufflig/ps-nodes] add split text modifier placeholder

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
