import { mapInput } from "./handlebar_template_completion";

test("mapInput - no variables", async () => {
  const variables = await mapInput({
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

test("mapInput - if you pass a template and a variable, take value of the variable", async () => {
  const variables = await mapInput(
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

test("mapInput - removes non existing variables", async () => {
  const variables = await mapInput({
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

test("mapInput - keep default values from the previous state", async () => {
  const variables = await mapInput(
    {
      template: `summarize {{longText}}`,
      variables: [],
    },
    {
      prevInput: {
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

test("mapInput - override values from the previous state with the new value", async () => {
  const variables = await mapInput(
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
      prevInput: {
        variables: [
          {
            id: "longText",
            name: "longText",
            type: "text",
            defaultValue: "old long text",
            description: "",
          },
        ],
      },
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
