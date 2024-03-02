# Recipes

A recipe is a combination of AI [instructions](instructions.md). It can be described as code written in natural language that you can use as automation, part of an automation or as part of a customer facing application. A recipe is your way of defining a blueprint of AI [**instructions**](concepts/instructions.md) that the LLM follows to solve your specific problem.

In a recipe, instructions can be combined together to create more advanced functionality. Once created, a recipe can be deployed through an API. You can use our [SDK](/sdk/js) or our [Rest API](/api/getting-started) to integrate the tool into your codebase. You can also share a preview of the tool using our [shareable ui](../tools/preview.md) feature.

A recipe can contain [**chained**](instructions.md#chained-instructions-in-a-recipe) instructions. But, unless you chain the instructions by referring to the other instructions, then they the default behavior is that they run independently.

LLMs can produce even better results if they solve a specific problem at a time instead of many problems at the same time. That's why we recommend you to split your solution into several instructions and to make your instructions as precise as possible.

::: warning Default behavior of instructions in a recipe

Instructions inside a recipe are independent of each other by default, they are not part of a chat. If you want to use the output of an instruction in another instruction, you can [chain them](#chained-instructions-in-a-recipe)

:::

