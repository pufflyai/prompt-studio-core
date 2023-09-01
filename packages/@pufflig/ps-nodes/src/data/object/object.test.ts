import { objectNode } from "./object";

test("correctly map empty inputs", async () => {
  expect(await objectNode.execute?.({})).toMatchInlineSnapshot(`
    {
      "object": [],
    }
  `);
});

test("correctly map different inputs", async () => {
  expect(
    await objectNode.execute?.({
      a: "b",
      c: 0.1,
      d: ["1", "2", "3"],
    })
  ).toMatchInlineSnapshot(`
    {
      "object": [
        {
          "defaultValue": "b",
          "description": "",
          "id": "a",
          "name": "a",
          "type": "text",
        },
        {
          "defaultValue": 0.1,
          "description": "",
          "id": "c",
          "name": "c",
          "type": "number",
        },
        {
          "defaultValue": [
            "1",
            "2",
            "3",
          ],
          "description": "",
          "id": "d",
          "name": "d",
          "type": "list",
        },
      ],
    }
  `);
});
