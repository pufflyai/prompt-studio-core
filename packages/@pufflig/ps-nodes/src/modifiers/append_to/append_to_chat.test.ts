import { Chat, ChatMessage } from "@pufflig/ps-types";
import { appendToChat } from "./append_to_chat";

const chat: Chat = {
  messages: [],
};

const chatMessage: ChatMessage = {
  id: "1",
  content: "hello",
  createdAt: "2021-01-01",
  role: "user",
};

test("append_to_chat - append message", async () => {
  const variables = await appendToChat.execute({
    chat,
    message: chatMessage,
    messageId: "1",
  });
  expect(variables).toMatchInlineSnapshot(`
    {
      "chat": {
        "messages": [
          {
            "content": "hello",
            "createdAt": "2021-01-01",
            "id": "1",
            "role": "user",
          },
        ],
      },
    }
  `);
});

test("append_to_chat - append message with existing messages", async () => {
  const chat = {
    messages: [chatMessage, chatMessage],
  };
  const variables = await appendToChat.execute({
    chat,
    message: { ...chatMessage, id: "2" },
    messageId: "",
  });
  expect(variables).toMatchInlineSnapshot(`
    {
      "chat": {
        "messages": [
          {
            "content": "hello",
            "createdAt": "2021-01-01",
            "id": "1",
            "role": "user",
          },
          {
            "content": "hello",
            "createdAt": "2021-01-01",
            "id": "1",
            "role": "user",
          },
          {
            "content": "hello",
            "createdAt": "2021-01-01",
            "id": "2",
            "role": "user",
          },
        ],
      },
    }
  `);
});

test("append_to_chat - don't append message if it hasn't changed", async () => {
  const chat = {
    messages: [chatMessage, chatMessage],
  };
  const variables = await appendToChat.execute({
    chat,
    message: chatMessage,
    messageId: "",
  });
  expect(variables).toMatchInlineSnapshot(`
    {
      "chat": {
        "messages": [
          {
            "content": "hello",
            "createdAt": "2021-01-01",
            "id": "1",
            "role": "user",
          },
          {
            "content": "hello",
            "createdAt": "2021-01-01",
            "id": "1",
            "role": "user",
          },
        ],
      },
    }
  `);
});

test("append_to_chat - append to an existing message given the same id", async () => {
  const chat = {
    messages: [
      {
        id: "2",
        content: "hello",
        createdAt: "2021-01-01",
        role: "user" as const,
      },
      chatMessage,
    ],
  };
  const variables = await appendToChat.execute({
    chat,
    message: { ...chatMessage, id: "3" },
    messageId: "2",
  });
  expect(variables).toMatchInlineSnapshot(`
    {
      "chat": {
        "messages": [
          {
            "content": "hello",
            "createdAt": "2021-01-01",
            "id": "2",
            "role": "user",
            "versions": [
              {
                "content": "hello",
                "createdAt": "2021-01-01",
                "id": "3",
                "role": "user",
              },
            ],
          },
          {
            "content": "hello",
            "createdAt": "2021-01-01",
            "id": "1",
            "role": "user",
          },
        ],
      },
    }
  `);
});
