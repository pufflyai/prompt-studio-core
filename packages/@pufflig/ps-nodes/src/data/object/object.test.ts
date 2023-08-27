import { objectNode } from "./object";

test("object node - empty input", async () => {
  const variables = await objectNode.execute({});
  expect(variables).toMatchInlineSnapshot(`
    {
      "object": [],
    }
  `);
});

test("object node - single text input", async () => {
  const variables = await objectNode.execute({
    "param-1": "This is text",
  });
  expect(variables).toMatchInlineSnapshot(`
    {
      "object": [
        {
          "defaultValue": "This is text",
          "description": "",
          "id": "param-1",
          "name": "param-1",
          "type": "text",
        },
      ],
    }
  `);
});

test("object node - multiple inputs", async () => {
  const variables = await objectNode.execute({
    "param-1": "This is text",
    "param-2": 0.1,
  });
  expect(variables).toMatchInlineSnapshot(`
    {
      "object": [
        {
          "defaultValue": "This is text",
          "description": "",
          "id": "param-1",
          "name": "param-1",
          "type": "text",
        },
        {
          "defaultValue": 0.1,
          "description": "",
          "id": "param-2",
          "name": "param-2",
          "type": "number",
        },
      ],
    }
  `);
});
