# Checklist

The **checklist node** will process your document, no matter its length, and fill a table with the requested parameters. The entire document is given to the AI to make sure no details are overlooked. This method is great for analyzing documents, completing checklists, or getting information from unstructured data.

This node returns a table in either CSV or markdown formats, and will self heal incompatible results.

![Table](./images/table.png)

## Inputs

The Checklist node has the following inputs:

**`Control`** controls the order in which instructions are run. This field needs to be connected for the instruction to run.

**`AI Settings`** what [language model](/concepts/llms) and parameters to use to complete the instruction

**`Instructions`** additional information to the LLM, that will be inserted at the start of the prompt

**`Document`** the document to process, if the document + prompt are larger than the context length of the model, the document will be split and the prompt run on each part of the document

**`Checks`** the categories you would like to check, each check is composed of a label and a description e.g. label: "is_contract" description: "is the document a contract"

**`Fields`** additional columns for the resulting table, e.g. add "reasoning" as a field if you would like to get feedback as to why the language model picked a value

**`Format`** the format to return the table in, this can be CSV or markdown

::: info Defining checks

When defining a check, make sure to be as descriptive as possible for the language model to be able to complete the table correctly

:::

## Outputs

**`Checklist`** A table containing the checks in the required format
