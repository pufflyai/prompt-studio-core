import { parseInput } from "./handlebar_template_completion";

test("parseInput - no variables", async () => {
  const variables = await parseInput({
    template: `{{hello}} pufflig`,
    variables: [],
  });
  expect(variables).toMatchInlineSnapshot(`
    {
      "template": "{{hello}} pufflig",
      "variables": [
        {
          "defaultValue": "",
          "description": "",
          "id": "hello",
          "name": "hello",
          "type": "text",
        },
      ],
    }
  `);
});

test("parseInput - doesn't overwrite existing values", async () => {
  const variables = await parseInput(
    {
      template: `{{hello}} pufflig`,
      variables: [
        {
          id: "hello",
          name: "hello",
          type: "text",
          defaultValue: "pretty",
          description: "",
        },
      ],
    },
    {}
  );
  expect(variables).toMatchInlineSnapshot(`
    {
      "template": "{{hello}} pufflig",
      "variables": [
        {
          "defaultValue": "pretty",
          "description": "",
          "id": "hello",
          "name": "hello",
          "type": "text",
        },
      ],
    }
  `);
});

test("parseInput - removes non existing variables", async () => {
  const variables = await parseInput({
    template: `{{hello}} pufflig`,
    variables: [
      {
        id: "test",
        name: "test",
        type: "text",
        defaultValue: "",
        description: "",
      },
    ],
  });
  expect(variables).toMatchInlineSnapshot(`
    {
      "template": "{{hello}} pufflig",
      "variables": [
        {
          "defaultValue": "",
          "description": "",
          "id": "hello",
          "name": "hello",
          "type": "text",
        },
      ],
    }
  `);
});

test("parseInput - keep default values from the previous state", async () => {
  const variables = await parseInput(
    {
      template: `{{hello}} pufflig`,
      variables: [],
    },
    {
      variables: [
        {
          id: "hello",
          name: "hello",
          type: "text",
          defaultValue: "pretty",
          description: "",
        },
      ],
    }
  );
  expect(variables).toMatchInlineSnapshot(`
    {
      "template": "{{hello}} pufflig",
      "variables": [
        {
          "defaultValue": "pretty",
          "description": "",
          "id": "hello",
          "name": "hello",
          "type": "text",
        },
      ],
    }
  `);
});
