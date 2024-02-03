---
slug: instructions
title: Instructions vs Prompts
authors: [aure]
tags: [Prompt Studio, instructions, prompts, product update]
---

# Instructions vs Prompts

One thing you will notice quickly when working with prompts is that regardless how well you craft them, they by themselves are no guarantee for consistent results. The language model you use as well as the parameters you give it, all affect the end result. A prompt that works well with GPT-4 might generate very different content on another LLM like Mistral, and even the same LLM might produce different results after an update. LLM providers are constantly improving their models but while a model might give better results on general tasks after the update, there is no guarantee that it will still perform well with your prompt.

## AI Presets

Another thing you will notice is that each LLM has different parameters. Parameters that can drastically change the tone, accuracy and quality of the results. Even when LLMs have parameters with the same name, their effects on the result will vary. One common parameter, “temperature” has a wide variety of ranges across models and sometimes different meanings. The same setting will generate great results with one LLM and incoherent blabber in another.

All this of course makes it tricky to know what settings to pick for what model to achieve a specific goal. To help you manage these settings centrally within your organization, you can now group LLMs and their parameters in what we call “AI Presets”. These AI Presets can be reused across your projects. We provide several AI Presets out of the box: “Accurate”, “Creative”, “Casual”, … but you will be able to expand this list with your own creations, including connecting your own fine tuned models.

## What are instructions?

Another concept we added to the latest version of Prompt Studio are instructions, instructions are a combination of a Prompt, and an AI Preset. This distinction helps you keep the relevant pieces you need to generate content together. This is especially useful for versioning purposes and when monitoring the quality of results you get.

Next week we will talk more about how you can combine instructions into chains in the new version of Prompt Studio.
