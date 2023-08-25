import { nodes } from "@pufflig/ps-nodes";

export const live_chain = {
  nodeTypes: nodes,
  definition: {
    nodes: {
      "0e3f8188-8217-4aa5-9982-947aaa7601d6": {
        id: "0e3f8188-8217-4aa5-9982-947aaa7601d6",
        type: "core/input",
        autorun: true,
        editor: {
          position: {
            x: 1222,
            y: 0,
          },
        },
      },
      "c9d15a04-9b20-4d34-ab74-d73eadc49ab0": {
        id: "c9d15a04-9b20-4d34-ab74-d73eadc49ab0",
        type: "modifier/append_to_chat",
        autorun: true,
        editor: {
          position: {
            x: 0,
            y: 0,
          },
        },
      },
      "f99f1f6a-10e7-4cb2-b86a-91bbd8d8db63": {
        id: "f99f1f6a-10e7-4cb2-b86a-91bbd8d8db63",
        type: "adapter/openai_chat",
        autorun: true,
        editor: {
          position: {
            x: 0,
            y: 0,
          },
        },
      },
      "b80fbffc-cc81-44bc-9f07-8c6d9c208ed7": {
        id: "b80fbffc-cc81-44bc-9f07-8c6d9c208ed7",
        type: "modifier/append_to_chat",
        autorun: true,
        editor: {
          position: {
            x: 0,
            y: 0,
          },
        },
      },
      "ec63e440-81bd-46d9-a9ab-91c4dd78e21d": {
        id: "ec63e440-81bd-46d9-a9ab-91c4dd78e21d",
        type: "core/output",
        autorun: true,
        editor: {
          position: {
            x: 0,
            y: 0,
          },
        },
      },
    },
    edges: {
      "c767858f-05c3-4a2c-9b0d-64f0bcaa3101": {
        id: "c767858f-05c3-4a2c-9b0d-64f0bcaa3101",
        source: "0e3f8188-8217-4aa5-9982-947aaa7601d6",
        target: "c9d15a04-9b20-4d34-ab74-d73eadc49ab0",
        sourceHandle: "messageId",
        targetHandle: "messageId",
      },
      "a5bc3740-0ac2-46f8-aea7-55c386baf80e": {
        id: "a5bc3740-0ac2-46f8-aea7-55c386baf80e",
        source: "0e3f8188-8217-4aa5-9982-947aaa7601d6",
        target: "c9d15a04-9b20-4d34-ab74-d73eadc49ab0",
        sourceHandle: "chat",
        targetHandle: "chat",
      },
      "26455c14-5cbd-4e5a-b6cb-139f7da76449": {
        id: "26455c14-5cbd-4e5a-b6cb-139f7da76449",
        source: "0e3f8188-8217-4aa5-9982-947aaa7601d6",
        target: "c9d15a04-9b20-4d34-ab74-d73eadc49ab0",
        sourceHandle: "message",
        targetHandle: "message",
      },
      "0e3ba7f8-24c4-488a-a089-bebb4b9678ea": {
        id: "0e3ba7f8-24c4-488a-a089-bebb4b9678ea",
        source: "0e3f8188-8217-4aa5-9982-947aaa7601d6",
        target: "f99f1f6a-10e7-4cb2-b86a-91bbd8d8db63",
        sourceHandle: "model",
        targetHandle: "model",
      },
      "a7fd542d-d5e9-4575-babf-ff402f7e9c4f": {
        id: "a7fd542d-d5e9-4575-babf-ff402f7e9c4f",
        source: "c9d15a04-9b20-4d34-ab74-d73eadc49ab0",
        target: "f99f1f6a-10e7-4cb2-b86a-91bbd8d8db63",
        sourceHandle: "chat",
        targetHandle: "chat",
      },
      "f64226de-fd93-4508-8d10-f2807d84ab60": {
        id: "f64226de-fd93-4508-8d10-f2807d84ab60",
        source: "c9d15a04-9b20-4d34-ab74-d73eadc49ab0",
        target: "b80fbffc-cc81-44bc-9f07-8c6d9c208ed7",
        sourceHandle: "chat",
        targetHandle: "chat",
      },
      "c0184707-4da3-4cb1-9b6f-b29a45fefa7a": {
        id: "c0184707-4da3-4cb1-9b6f-b29a45fefa7a",
        source: "f99f1f6a-10e7-4cb2-b86a-91bbd8d8db63",
        target: "b80fbffc-cc81-44bc-9f07-8c6d9c208ed7",
        sourceHandle: "message",
        targetHandle: "message",
      },
      "2e586560-52a7-4163-ac12-4e1d5c73391f": {
        id: "2e586560-52a7-4163-ac12-4e1d5c73391f",
        source: "b80fbffc-cc81-44bc-9f07-8c6d9c208ed7",
        target: "ec63e440-81bd-46d9-a9ab-91c4dd78e21d",
        sourceHandle: "chat",
        targetHandle: "chat",
      },
    },
  },
  state: {},
};
