import { mapInput } from "./handlebar_template_chat";

test("mapInput - several variables with two of the same variable", async () => {
  const variables = await mapInput({
    chat: {
      messages: [
        {
          id: "id",
          role: "user",
          content: "hello {{name}}",
          createdAt: "date",
          provider: "openAi",
        },
        {
          id: "id",
          role: "user",
          content: "summarize this text: {{text}}",
          createdAt: "date",
          provider: "openAi",
        },
        {
          id: "id",
          role: "user",
          content: "and then tell me the tone of this text: {{text}}",
          createdAt: "date",
          provider: "openAi",
        },
      ],
    },
    variables: [],
  });
  expect(variables).toMatchInlineSnapshot(`
    {
      "chat": {
        "messages": [
          {
            "content": "hello {{name}}",
            "createdAt": "date",
            "id": "id",
            "provider": "openAi",
            "role": "user",
          },
          {
            "content": "summarize this text: {{text}}",
            "createdAt": "date",
            "id": "id",
            "provider": "openAi",
            "role": "user",
          },
          {
            "content": "and then tell me the tone of this text: {{text}}",
            "createdAt": "date",
            "id": "id",
            "provider": "openAi",
            "role": "user",
          },
        ],
      },
      "variables": [
        {
          "defaultValue": "",
          "description": "",
          "id": "name",
          "name": "name",
          "type": "text",
        },
        {
          "defaultValue": "",
          "description": "",
          "id": "text",
          "name": "text",
          "type": "text",
        },
      ],
    }
  `);
});

test("mapInput - if you pass a template and a variable, take value of the variable", async () => {
  const variables = await mapInput(
    {
      chat: {
        messages: [
          {
            id: "id",
            role: "user",
            content: "summarize this text: {{longText}}",
            createdAt: "date",
            provider: "openAi",
          },
        ],
      },
      variables: [
        {
          id: "longText",
          name: "longText",
          type: "text",
          defaultValue: "some long text",
          description: "",
        },
      ],
    },
    {}
  );
  expect(variables).toMatchInlineSnapshot(`
    {
      "chat": {
        "messages": [
          {
            "content": "summarize this text: {{longText}}",
            "createdAt": "date",
            "id": "id",
            "provider": "openAi",
            "role": "user",
          },
        ],
      },
      "variables": [
        {
          "defaultValue": "some long text",
          "description": "",
          "id": "longText",
          "name": "longText",
          "type": "text",
        },
      ],
    }
  `);
});

test("mapInput - removes non existing variables", async () => {
  const variables = await mapInput({
    chat: {
      messages: [
        {
          id: "id",
          role: "user",
          content: "summarize this text: {{longText}}",
          createdAt: "date",
          provider: "openAi",
        },
      ],
    },
    variables: [
      {
        id: "otherVariable",
        name: "otherVariable",
        type: "text",
        defaultValue: "",
        description: "",
      },
    ],
  });
  expect(variables).toMatchInlineSnapshot(`
    {
      "chat": {
        "messages": [
          {
            "content": "summarize this text: {{longText}}",
            "createdAt": "date",
            "id": "id",
            "provider": "openAi",
            "role": "user",
          },
        ],
      },
      "variables": [
        {
          "defaultValue": "",
          "description": "",
          "id": "longText",
          "name": "longText",
          "type": "text",
        },
      ],
    }
  `);
});

test("mapInput - keep default values from the previous state", async () => {
  const variables = await mapInput(
    {
      chat: {
        messages: [
          {
            id: "id",
            role: "user",
            content: "summarize this text: {{longText}}",
            createdAt: "date",
            provider: "openAi",
          },
        ],
      },
      variables: [],
    },
    {
      prevInput: {
        variables: [
          {
            id: "longText",
            name: "longText",
            type: "text",
            defaultValue: "some long text",
            description: "",
          },
        ],
      },
    }
  );
  expect(variables).toMatchInlineSnapshot(`
    {
      "chat": {
        "messages": [
          {
            "content": "summarize this text: {{longText}}",
            "createdAt": "date",
            "id": "id",
            "provider": "openAi",
            "role": "user",
          },
        ],
      },
      "variables": [
        {
          "defaultValue": "some long text",
          "description": "",
          "id": "longText",
          "name": "longText",
          "type": "text",
        },
      ],
    }
  `);
});

test("mapInput - override values from the previous state with the new value", async () => {
  const variables = await mapInput(
    {
      chat: {
        messages: [
          {
            id: "id",
            role: "user",
            content: "summarize this text: {{longText}}",
            createdAt: "date",
            provider: "openAi",
          },
        ],
      },
      variables: [
        {
          id: "longText",
          name: "longText",
          type: "text",
          defaultValue: "new long text",
          description: "",
        },
      ],
    },
    {
      prevInput: {
        variables: [
          {
            id: "longText",
            name: "longText",
            type: "text",
            defaultValue: "old long text",
            description: "",
          },
        ],
      },
    }
  );
  expect(variables).toMatchInlineSnapshot(`
    {
      "chat": {
        "messages": [
          {
            "content": "summarize this text: {{longText}}",
            "createdAt": "date",
            "id": "id",
            "provider": "openAi",
            "role": "user",
          },
        ],
      },
      "variables": [
        {
          "defaultValue": "new long text",
          "description": "",
          "id": "longText",
          "name": "longText",
          "type": "text",
        },
      ],
    }
  `);
});
