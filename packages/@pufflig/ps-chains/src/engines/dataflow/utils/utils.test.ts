import { simpleDataNode } from "../../../mocks/nodes";
import { applyDefaultInputs, getEdgeMap, mapOutputToInput } from "./utils";

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
    simpleDataNode
  );

  expect(res).toMatchInlineSnapshot(`
    {
      "data": "",
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

test("return a map of edges between two nodes", async () => {
  const res = getEdgeMap([
    {
      id: "1",
      source: "1",
      sourceHandle: "1",
      target: "2",
      targetHandle: "1",
    },
    {
      id: "2",
      source: "1",
      sourceHandle: "2",
      target: "2",
      targetHandle: "2",
    },
    {
      id: "3",
      source: "1",
      sourceHandle: "1",
      target: "2",
      targetHandle: "3",
    },
  ]);

  expect(res).toMatchInlineSnapshot(`
    {
      "1": [
        "1",
        "3",
      ],
      "2": [
        "2",
      ],
    }
  `);
});

test("map the outputs of a node to the inputs of a node", async () => {
  const res = mapOutputToInput(
    { 1: "a", 2: "b" },
    {
      "1": ["1", "3"],
      "2": ["2"],
    }
  );

  expect(res).toMatchInlineSnapshot(`
    {
      "1": "a",
      "2": "b",
      "3": "a",
    }
  `);
});
