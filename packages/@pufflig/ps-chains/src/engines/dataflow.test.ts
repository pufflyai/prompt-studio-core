import { Chain } from "../types";
import { runFromNode } from "./dataflow";

const singleNode: Chain = {
  definition: {
    edges: [],
    nodes: [
      {
        id: "1",
        type: "input/template_editor",
      },
    ],
  },
  state: {
    "1": {
      data: {},
      editor: {
        position: { x: 0, y: 0 },
      },
      status: "idle",
    },
  },
};

test("set input for single node in the editor", async () => {
  const onNodeStateUpdate = jest.fn();
  const res = await runFromNode(singleNode, "1", { template: "Hello World" }, onNodeStateUpdate);
  expect(onNodeStateUpdate).toHaveBeenCalledTimes(1);
  expect(res).toMatchInlineSnapshot(`
    {
      "1": {
        "data": {
          "template": "Hello World",
        },
        "editor": {
          "position": {
            "x": 0,
            "y": 0,
          },
        },
        "status": "idle",
      },
    }
  `);
});

const simpleChain: Chain = {
  definition: {
    edges: [
      {
        id: "1",
        source: "1",
        target: "2",
        source_handle: "text",
        target_handle: "template",
      },
      {
        id: "2",
        source: "2",
        target: "3",
        source_handle: "template",
        target_handle: "text",
      },
    ],
    nodes: [
      {
        id: "1",
        type: "input/template_editor",
      },
      {
        id: "2",
        type: "modifier/handlebar_template_completion",
      },
      {
        id: "3",
        type: "output/completion_display",
      },
    ],
  },
  state: {
    "1": {
      data: {},
      editor: {
        position: { x: 0, y: 0 },
      },
      status: "idle",
    },
    "2": {
      data: {
        variables: [
          {
            id: "World",
            name: "World",
            description: "",
            type: "text",
            defaultValue: "mars",
          },
        ],
      },
      editor: {
        position: { x: 0, y: 0 },
      },
      status: "idle",
    },
    "3": {
      data: {},
      editor: {
        position: { x: 0, y: 0 },
      },
      status: "idle",
    },
  },
};

test("set input for several nodes in the editor", async () => {
  const onNodeStateUpdate = jest.fn(console.log);
  const res = await runFromNode(simpleChain, "1", { template: "Hello {{World}}" }, onNodeStateUpdate);
  expect(onNodeStateUpdate).toHaveBeenCalledTimes(3);
  expect(res).toMatchInlineSnapshot(`
    {
      "1": {
        "data": {
          "template": "Hello {{World}}",
        },
        "editor": {
          "position": {
            "x": 0,
            "y": 0,
          },
        },
        "status": "idle",
      },
      "2": {
        "data": {
          "template": "Hello {{World}}",
          "variables": [
            {
              "defaultValue": "mars",
              "description": "",
              "id": "World",
              "name": "World",
              "type": "text",
            },
          ],
        },
        "editor": {
          "position": {
            "x": 0,
            "y": 0,
          },
        },
        "status": "idle",
      },
      "3": {
        "data": {
          "text": "Hello mars",
        },
        "editor": {
          "position": {
            "x": 0,
            "y": 0,
          },
        },
        "status": "idle",
      },
    }
  `);
});
