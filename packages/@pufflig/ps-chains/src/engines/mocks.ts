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
        target_handle: "prompt",
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
        target_handle: "prompt",
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
        target_handle: "prompt",
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

export const missingStates: Chain = {
  definition: {
    nodes: [
      {
        id: "c96eeaef-a4bb-4fa6-a32f-b9ad176456ea",
        type: "adapter/openai_completion",
        autorun: false,
        editor: { position: { x: 0, y: 0 } },
      },
      {
        id: "197375bb-c777-4be5-a423-6d5618e2200f",
        type: "input/template_editor",
        autorun: true,
        editor: { position: { x: 0, y: 0 } },
      },
      {
        id: "85c8bc66-cc5a-4400-b4d3-bc119ed1b2f7",
        type: "modifier/handlebar_template_completion",
        autorun: true,
        editor: { position: { x: 0, y: 0 } },
      },
      {
        id: "2708636f-633c-4c02-abec-093fdc79f4d5",
        type: "output/completion_display",
        autorun: true,
        editor: { position: { x: 0, y: 0 } },
      },
    ],
    edges: [
      {
        id: "5b253916-3ed9-4755-9f76-71adc451601f",
        source: "197375bb-c777-4be5-a423-6d5618e2200f",
        target: "85c8bc66-cc5a-4400-b4d3-bc119ed1b2f7",
        source_handle: "template",
        target_handle: "template",
      },
      {
        id: "2ad80e03-1ddd-4379-ae48-4a6398d20ff8",
        source: "85c8bc66-cc5a-4400-b4d3-bc119ed1b2f7",
        target: "c96eeaef-a4bb-4fa6-a32f-b9ad176456ea",
        source_handle: "text",
        target_handle: "prompt",
      },
      {
        id: "5ec1d394-6d14-47e0-a8ad-0b3b94371009",
        source: "85c8bc66-cc5a-4400-b4d3-bc119ed1b2f7",
        target: "2708636f-633c-4c02-abec-093fdc79f4d5",
        source_handle: "text",
        target_handle: "prompt",
      },
      {
        id: "5e2d0ac0-1e13-4313-a71d-d7bbcb522220",
        source: "c96eeaef-a4bb-4fa6-a32f-b9ad176456ea",
        target: "2708636f-633c-4c02-abec-093fdc79f4d5",
        source_handle: "completion",
        target_handle: "completion",
      },
    ],
  },
  state: {
    "197375bb-c777-4be5-a423-6d5618e2200f": {
      status: "idle",
      data: { template: "This is a test!" },
    },
  },
};

export const multiInput: Chain = {
  definition: {
    nodes: [
      {
        id: "1",
        type: "input/template_editor",
        autorun: true,
        editor: { position: { x: 0, y: 0 } },
      },
      {
        id: "2",
        type: "modifier/handlebar_template_completion",
        autorun: true,
        editor: { position: { x: 0, y: 0 } },
      },
      {
        id: "3",
        type: "output/completion_display",
        autorun: true,
        editor: { position: { x: 0, y: 0 } },
      },
    ],
    edges: [
      {
        id: "5b253916-3ed9-4755-9f76-71adc451601f",
        source: "1",
        target: "2",
        source_handle: "template",
        target_handle: "template",
      },
      {
        id: "2ad80e03-1ddd-4379-ae48-4a6398d20ff8",
        source: "1",
        target: "3",
        source_handle: "template",
        target_handle: "prompt",
      },
      {
        id: "5ec1d394-6d14-47e0-a8ad-0b3b94371009",
        source: "2",
        target: "3",
        source_handle: "text",
        target_handle: "completion",
      },
    ],
  },
  state: {
    "1": {
      status: "idle",
      data: { template: "This is a test!" },
    },
  },
};
