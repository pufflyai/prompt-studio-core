import { execute, getInputDefinition } from "./prompt";

test("execute - no variables", async () => {
  const variables = await execute({
    template: `summarize {{longText}}`,
  });
  expect(variables).toMatchInlineSnapshot(`
    {
      "prompt": "summarize {{longText}}",
    }
  `);
});

test("execute - empty variables", async () => {
  const variables = await execute({
    template: `summarize {{longText}}`,
    longText: "",
  });
  expect(variables).toMatchInlineSnapshot(`
    {
      "prompt": "summarize {{longText}}",
    }
  `);
});

test("execute - some variables", async () => {
  const variables = await execute({
    template: `summarize {{longText}}`,
    longText: "some long text",
    ignoreThis: "this should be ignored",
  });
  expect(variables).toMatchInlineSnapshot(`
    {
      "prompt": "summarize some long text",
    }
  `);
});

test("getInputDefinition - no variables", () => {
  const variables = getInputDefinition({
    template: `summarize {{longText}}`,
  });
  expect(variables).toMatchInlineSnapshot(`
[
  {
    "defaultValue": "summarize {{longText}}",
    "description": "Prompt Template to fill in",
    "id": "template",
    "name": "Template",
    "type": "text",
  },
  {
    "defaultValue": "",
    "description": "",
    "id": "longText",
    "name": "longText",
    "type": "text",
  },
]
`);
});

test("getInputDefinition - if you pass a template and a variable, take value of the variable", () => {
  const variables = getInputDefinition({
    template: `summarize {{longText}}`,
    longText: "some long text",
  });
  expect(variables).toMatchInlineSnapshot(`
[
  {
    "defaultValue": "summarize {{longText}}",
    "description": "Prompt Template to fill in",
    "id": "template",
    "name": "Template",
    "type": "text",
  },
  {
    "defaultValue": "some long text",
    "description": "",
    "id": "longText",
    "name": "longText",
    "type": "text",
  },
]
`);
});

test("getInputDefinition - ignores non existing variables", () => {
  const variables = getInputDefinition({
    template: `summarize {{longText}}`,
    otherVariable: "",
  });
  expect(variables).toMatchInlineSnapshot(`
[
  {
    "defaultValue": "summarize {{longText}}",
    "description": "Prompt Template to fill in",
    "id": "template",
    "name": "Template",
    "type": "text",
  },
  {
    "defaultValue": "",
    "description": "",
    "id": "longText",
    "name": "longText",
    "type": "text",
  },
]
`);
});
