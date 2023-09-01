import { parseInput } from "./handlebar_template_completion";

test("parseInput - no variables", async () => {
  const variables = await parseInput({
    template: `summarize {{longText}}`,
    variables: [],
  });
  expect(variables).toMatchInlineSnapshot(`
    {
      "template": "summarize {{longText}}",
      "variables": [
        {
          "defaultValue": "",
          "description": "",
          "id": "longText",
          "name": "longText",
          "type": "text",
        },
      ],
    }
  `);
});

test("parseInput - if you pass a template and a variable, take value of the variable", async () => {
  const variables = await parseInput(
    {
      template: `summarize {{longText}}`,
      variables: [
        {
          id: "longText",
          name: "longText",
          type: "text",
          defaultValue: "some long text",
          description: "",
        },
      ],
    },
    {}
  );
  expect(variables).toMatchInlineSnapshot(`
    {
      "template": "summarize {{longText}}",
      "variables": [
        {
          "defaultValue": "some long text",
          "description": "",
          "id": "longText",
          "name": "longText",
          "type": "text",
        },
      ],
    }
  `);
});

test("parseInput - removes non existing variables", async () => {
  const variables = await parseInput({
    template: `summarize {{longText}}`,
    variables: [
      {
        id: "otherVariable",
        name: "otherVariable",
        type: "text",
        defaultValue: "",
        description: "",
      },
    ],
  });
  expect(variables).toMatchInlineSnapshot(`
    {
      "template": "summarize {{longText}}",
      "variables": [
        {
          "defaultValue": "",
          "description": "",
          "id": "longText",
          "name": "longText",
          "type": "text",
        },
      ],
    }
  `);
});

test("parseInput - keep default values from the previous state", async () => {
  const variables = await parseInput(
    {
      template: `summarize {{longText}}`,
      variables: [],
    },
    {
      variables: [
        {
          id: "longText",
          name: "longText",
          type: "text",
          defaultValue: "some long text",
          description: "",
        },
      ],
    }
  );
  expect(variables).toMatchInlineSnapshot(`
    {
      "template": "summarize {{longText}}",
      "variables": [
        {
          "defaultValue": "some long text",
          "description": "",
          "id": "longText",
          "name": "longText",
          "type": "text",
        },
      ],
    }
  `);
});

test("parseInput - override values from the previous state with the new value", async () => {
  const variables = await parseInput(
    {
      template: `summarize {{longText}}`,
      variables: [
        {
          id: "longText",
          name: "longText",
          type: "text",
          defaultValue: "new long text",
          description: "",
        },
      ],
    },
    {
      variables: [
        {
          id: "longText",
          name: "longText",
          type: "text",
          defaultValue: "old long text",
          description: "",
        },
      ],
    }
  );
  expect(variables).toMatchInlineSnapshot(`
    {
      "template": "summarize {{longText}}",
      "variables": [
        {
          "defaultValue": "new long text",
          "description": "",
          "id": "longText",
          "name": "longText",
          "type": "text",
        },
      ],
    }
  `);
});