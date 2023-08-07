import { extractVariables } from "./extractVariables";

test("extractVariables - extract loops and first level variables", () => {
  const variables = extractVariables(`
    Hello world
    
    {{name}} {{surname}}
    
    {{#names}}
    * {{.}}
    {{/names}}`);

  expect(variables).toMatchInlineSnapshot(`
    [
      {
        "defaultValue": "",
        "description": "",
        "id": "name",
        "name": "name",
        "type": "text",
      },
      {
        "defaultValue": "",
        "description": "",
        "id": "surname",
        "name": "surname",
        "type": "text",
      },
      {
        "defaultValue": [],
        "description": "",
        "id": "names",
        "name": "names",
        "type": "list",
      },
    ]
  `);
});

test("extractVariables - returns null if the template is malformed", () => {
  const stub = jest.fn();
  const variables = extractVariables(
    `
      Hello world
      {{name}`,
    stub
  );
  expect(stub).toHaveBeenCalled();
  expect(variables).toMatchInlineSnapshot(`null`);
});
