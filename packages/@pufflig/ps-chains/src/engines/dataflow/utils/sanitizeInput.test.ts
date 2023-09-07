import { sanitizeInput } from "./sanitizeInput";

test("sanitizeInput - remove variables", async () => {
  const variables = await sanitizeInput({
    "param-1": "not_a_variable",
    "param-2": "${{ps:ref:variable-1}}",
    "param-3": "${{ps:ref:variable-2}",
    "param-4": "${{variable-4}}",
  });

  expect(variables).toMatchInlineSnapshot(`
    {
      "param-1": "not_a_variable",
      "param-2": "",
      "param-3": "\${{ps:ref:variable-2}",
      "param-4": "\${{variable-4}}",
    }
  `);
});
