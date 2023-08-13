---
title: &title Changelog
description: &description Changelog for Prompt Studio packages
head:
  - ["meta", { property: "og:title", content: *title }]
  - ["meta", { name: "twitter:title", content: *title }]
  - ["meta", { name: "twitter:description", content: *description }]
---

# Changelog

**Note**: the API for the packages in this repo will be highly unstable until we reach v1.0.0"

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
