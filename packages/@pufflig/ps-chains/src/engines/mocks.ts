import { Chain } from "../types";

export const singleNode: Chain = {
  definition: {
    edges: [],
    nodes: [
      {
        id: "1",
        type: "input/template_editor",
        editor: {
          position: { x: 0, y: 0 },
        },
      },
    ],
  },
  state: {
    "1": {
      data: {},
      status: "idle",
    },
  },
};

export const simpleChain: Chain = {
  definition: {
    edges: [
      {
        id: "1",
        source: "1",
        target: "2",
        source_handle: "template",
        target_handle: "template",
      },
      {
        id: "2",
        source: "2",
        target: "3",
        source_handle: "text",
        target_handle: "text",
      },
    ],
    nodes: [
      {
        id: "1",
        type: "input/template_editor",
        editor: {
          position: { x: 0, y: 0 },
        },
      },
      {
        id: "2",
        type: "modifier/handlebar_template_completion",
        editor: {
          position: { x: 0, y: 0 },
        },
      },
      {
        id: "3",
        type: "output/completion_display",
        editor: {
          position: { x: 0, y: 0 },
        },
      },
    ],
  },
  state: {
    "1": {
      data: {},
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
      status: "idle",
    },
    "3": {
      data: {},
      status: "idle",
    },
  },
};

export const autorunExample: Chain = {
  definition: {
    edges: [
      {
        id: "1",
        source: "1",
        target: "2",
        source_handle: "template",
        target_handle: "template",
      },
      {
        id: "2",
        source: "2",
        target: "3",
        source_handle: "text",
        target_handle: "text",
      },
    ],
    nodes: [
      {
        id: "1",
        type: "input/template_editor",
        editor: {
          position: { x: 0, y: 0 },
        },
      },
      {
        id: "2",
        type: "modifier/handlebar_template_completion",
        autorun: false,
        editor: {
          position: { x: 0, y: 0 },
        },
      },
      {
        id: "3",
        type: "output/completion_display",
        editor: {
          position: { x: 0, y: 0 },
        },
      },
    ],
  },
  state: {
    "1": {
      data: {},

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
      status: "idle",
    },
    "3": {
      data: {},
      status: "idle",
    },
  },
};

export const autorunRootExample: Chain = {
  definition: {
    edges: [
      {
        id: "1",
        source: "1",
        target: "2",
        source_handle: "template",
        target_handle: "template",
      },
      {
        id: "2",
        source: "2",
        target: "3",
        source_handle: "text",
        target_handle: "text",
      },
    ],
    nodes: [
      {
        id: "1",
        type: "input/template_editor",
        autorun: false,
        editor: {
          position: { x: 0, y: 0 },
        },
      },
      {
        id: "2",
        type: "modifier/handlebar_template_completion",
        editor: {
          position: { x: 0, y: 0 },
        },
      },
      {
        id: "3",
        type: "output/completion_display",
        editor: {
          position: { x: 0, y: 0 },
        },
      },
    ],
  },
  state: {
    "1": {
      data: {},
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
      status: "idle",
    },
    "3": {
      data: {},
      status: "idle",
    },
  },
};

export const simpleLoop: Chain = {
  definition: {
    edges: [
      {
        id: "1",
        source: "1",
        target: "1",
        source_handle: "template",
        target_handle: "template",
      },
    ],
    nodes: [
      {
        id: "1",
        type: "input/template_editor",
        editor: {
          position: { x: 0, y: 0 },
        },
      },
    ],
  },
  state: {
    "1": {
      data: {},
      status: "idle",
    },
  },
};
