import { simpleNode } from "../../mocks/nodes";
import { applyDefaultInputs } from "./utils";

test("apply default inputs without overwriting them", async () => {
  const res = applyDefaultInputs(
    {
      variables: [
        {
          id: "template",
          name: "hello",
          type: "text",
          defaultValue: "TEST",
          description: "",
        },
      ],
    },
    simpleNode
  );

  expect(res).toMatchInlineSnapshot(`
    {
      "template": "",
      "variables": [
        {
          "defaultValue": "TEST",
          "description": "",
          "id": "template",
          "name": "hello",
          "type": "text",
        },
      ],
    }
  `);
});
