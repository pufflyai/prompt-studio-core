import { applyDefaultInputs } from "./dataflow";

test("apply default inputs without overwriting them", async () => {
  const res = applyDefaultInputs(
    {
      variables: [
        {
          id: "hello",
          name: "hello",
          type: "text",
          defaultValue: "TEST",
          description: "",
        },
      ],
    },
    "modifier/handlebar_template_completion"
  );

  expect(res).toMatchInlineSnapshot(`
    {
      "template": "",
      "variables": [
        {
          "defaultValue": "TEST",
          "description": "",
          "id": "hello",
          "name": "hello",
          "type": "text",
        },
      ],
    }
  `);
});
