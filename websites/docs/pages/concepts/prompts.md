# Prompts

A **prompt** is input provided to a language model to guide the model's response, helping it understand context so that it can generate coherent and correct output. A good prompt should be structured to provide context and guidance to the model allowing it to generate a meaningful response. Prompts are constrained by the context length of the [language model](/concepts/llms) used.

In Prompt Studio, **prompts** are used by [instructions](/concepts/instructions).

Writing good prompts has become a domain of its own and there are many resources out there on how to write better prompts, a good place to start is [the prompt engineering guide](https://www.promptingguide.ai/).

## Variables

Sometimes not all parts of a prompt are known from the start. You can format prompts so that certain values are passed later, when the prompt is executed. Such values are called `variables`. You can denote a variable in a prompt using curly brackets, e.g.:

```
Summarize the following message: {{message}}
```

In the example above **message** can be the result of another instruction or an input provided by a user of your instruction.

::: warning Prompt Injections

Be aware that inserting user generated text in your prompts might throw off the results, either intentionally: the user tries to override the original instructions you created, or unintentionally due to text passages that are reminiscent of instructions.

:::

## Meta Prompts

A **meta prompt** is a prompt used to generate other prompts that perform well at specific tasks. Meta prompts usually provide some framework or format that the [language model](/concepts/llms) will follow when creating prompts given some user instructions.
