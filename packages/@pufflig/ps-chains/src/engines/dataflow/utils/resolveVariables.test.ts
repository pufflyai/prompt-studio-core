import { resolveVariables } from "./resolveVariables";

test("resolveVariables - extract variables", async () => {
  const resolver = jest.fn(async (variableName) => {
    return `RESOLVED_WITH_${variableName}`;
  });

  expect(
    await resolveVariables(
      {
        "param-1": "not_a_variable",
        "param-2": "${{ps:ref:variable-1}}",
        "param-3": "${{ps:ref:variable-2}}",
        "param-4": "{{}}",
        "param-5": "${{ps:ref:variable-1}} ${{ps:ref:variable-2}}",
        "param-6": "{{dont_replace}} ${{ps:ref:variable-2}}",
        "param-7": "{{faulty}",
        "param-8": "{{faulty} ${{ps:ref:variable-2}}",
      },
      resolver
    )
  ).toMatchInlineSnapshot(`
    {
      "param-1": "not_a_variable",
      "param-2": "RESOLVED_WITH_variable-1",
      "param-3": "RESOLVED_WITH_variable-2",
      "param-4": "{{}}",
      "param-5": "RESOLVED_WITH_variable-1 RESOLVED_WITH_variable-2",
      "param-6": "{{dont_replace}} RESOLVED_WITH_variable-2",
      "param-7": "{{faulty}",
      "param-8": "{{faulty} RESOLVED_WITH_variable-2",
    }
  `);
});
