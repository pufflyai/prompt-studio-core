import { delimiterEnd, delimiterStart } from "../constants";
import { extractVariables } from "./extractVariables";

test("extractVariables - extract loops and first level variables", () => {
  const variables = extractVariables(`Hello world \${{name}} ${delimiterStart}surname${delimiterEnd}
    {{#names}}
    * {{.}}
    {{/names}}`);

  expect(variables).toMatchInlineSnapshot(`
    [
      "surname",
    ]
  `);
});

test("extractVariables - malformed handlebar does not impact extraction", () => {
  const stub = jest.fn();
  const variables = extractVariables(`Hello {{name} ${delimiterStart}surname${delimiterEnd}`, stub);
  expect(variables).toMatchInlineSnapshot(`
    [
      "surname",
    ]
  `);
});

test("extractVariables - returns null if the template is malformed", () => {
  const stub = jest.fn();
  const variables = extractVariables(`Hello ${delimiterStart}surname}!`, stub);
  expect(stub).toHaveBeenCalled();
  expect(variables).toMatchInlineSnapshot(`null`);
});
