import { WebSocket } from "unws";
import { getApiServiceWebSocketUrl } from "../constants";
import { streamCompletion } from "./streamCompletion";

const mockWebSocketInstance = {
  onopen: jest.fn(),
  onerror: jest.fn(),
  onmessage: jest.fn(),
  send: jest.fn(),
  close: jest.fn(),
};

jest.mock("unws", () => {
  return {
    WebSocket: jest.fn().mockImplementation(() => mockWebSocketInstance),
  };
});

jest.mock("../constants");

describe("streamCompletion", () => {
  const fakeUrl = "ws://fake-url";

  beforeEach(() => {
    (getApiServiceWebSocketUrl as jest.Mock).mockReturnValue(fakeUrl);
  });

  it.skip("should connect to WebSocket and send start message", async () => {
    const input = {
      apiKey: "fake-api-key",
      modelId: "fake-model-id",
      prompt: "fake-prompt",
    };

    const generator = streamCompletion(input);

    generator.next();

    expect(WebSocket).toHaveBeenCalledWith(`${fakeUrl}/api/v1/completion/streamed`);

    // Simulate successful WebSocket connection
    mockWebSocketInstance.onopen();

    // Assert that a start message is sent
    expect(mockWebSocketInstance.send).toHaveBeenCalledWith(expect.any(String));
  });

  it.skip("should handle WebSocket error", async () => {
    const input = {
      apiKey: "fake-api-key",
      modelId: "fake-model-id",
      prompt: "fake-prompt",
    };

    const errorMessage = "WebSocket error";
    mockWebSocketInstance.onerror(new Error(errorMessage));

    const generator = streamCompletion(input);

    await generator.next();

    await expect(generator.next()).resolves.toEqual({
      done: true,
      value: expect.objectContaining({
        is_error: true,
        error: errorMessage,
      }),
    });
  });

  it.skip("should handle received messages and close on end message", async () => {
    const input = {
      apiKey: "fake-api-key",
      modelId: "fake-model-id",
      prompt: "fake-prompt",
    };

    const generator = streamCompletion(input);
    generator.next();

    // Simulate receiving messages
    const messageData1 = { datapoint: { model_output: "output1" } };
    const messageData2 = { datapoint: { model_output: "output2" } };
    mockWebSocketInstance.onmessage({ data: JSON.stringify({ type: "chunk", data: messageData1 }) });
    mockWebSocketInstance.onmessage({ data: JSON.stringify({ type: "chunk", data: messageData2 }) });
    mockWebSocketInstance.onmessage({ data: JSON.stringify({ type: "end" }) });

    await expect(generator.next()).resolves.toEqual({ value: messageData1, done: false });
    await expect(generator.next()).resolves.toEqual({ value: messageData2, done: false });
    await expect(generator.next()).resolves.toEqual({ value: undefined, done: true });

    expect(mockWebSocketInstance.close).toHaveBeenCalled();
  });
});
