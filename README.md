<p align="center">
  <img src="assets/banner.png" />
</p>

> ⚠️ **Under Construction** the API and project structure are subject to change and no documentation was added yet. ⚠️

# Prompt Studio Core

[![Build Status](https://img.shields.io/github/actions/workflow/status/pufflyai/prompt-studio-core/test-and-build.yml?branch=main&style=flat&colorA=000000&colorB=000000)](https://github.com/pufflyai/prompt-studio-core/actions?query=workflow%3Atest-and-build)
[![Discord Shield](https://img.shields.io/discord/1086313238960025631?style=flat&colorA=000000&colorB=000000&label=discord&logo=discord&logoColor=ffffff)](https://discord.gg/3RxwUEk8fW)
[![Version](https://img.shields.io/npm/v/@pufflig/ps-chains?style=flat&colorA=000000&colorB=000000)](https://www.npmjs.com/package/@pufflig/ps-chains)

Prompt Studio is a collaborative prompt engineering platform for teams that work with LLMs.

## Setup

This is a monorepo managed using [lerna](https://lerna.js.org/)

### Install dependencies

From the root of the repo, run `yarn install`.

### Build all packages

From the root of the repo, run `npx lerna run build`.

### Run all tests

From the root of the repo, run `npx lerna run test`.

### Update packages

From the root of the repo, run `npx lerna version --no-private`

### Publish packages

From the root of the repo, run `npx lerna publish --no-private`
