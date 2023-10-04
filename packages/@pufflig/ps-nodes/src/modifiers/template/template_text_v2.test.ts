import { mapInput } from "./template_text_v2";

test("mapInput - no variables", async () => {
  const variables = await mapInput({
    template: `summarize {{longText}}`,
  });
  expect(variables).toMatchInlineSnapshot(`
    [
      {
        "defaultValue": "summarize {{longText}}",
        "description": "Template to fill in",
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

test("mapInput - if you pass a template and a variable, take value of the variable", async () => {
  const variables = await mapInput({
    template: `summarize {{longText}}`,
    longText: "some long text",
  });
  expect(variables).toMatchInlineSnapshot(`
    [
      {
        "defaultValue": "summarize {{longText}}",
        "description": "Template to fill in",
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

test("mapInput - ignores non existing variables", async () => {
  const variables = await mapInput({
    template: `summarize {{longText}}`,
    otherVariable: "",
  });
  expect(variables).toMatchInlineSnapshot(`
    [
      {
        "defaultValue": "summarize {{longText}}",
        "description": "Template to fill in",
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
