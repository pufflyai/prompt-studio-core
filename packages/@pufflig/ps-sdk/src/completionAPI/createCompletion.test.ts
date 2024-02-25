import axios from "axios";
import { createCompletion } from "../completionAPI/createCompletion";

jest.mock("axios");

describe("createCompletion", () => {
  const mockAxios = axios as jest.Mocked<typeof axios>;

  const mockResponse = {
    datapoint: {
      model_output: "Hello, world!",
      model_input: "Hello",
      model_id: "model_123",
    },
  };

  const mockInput = {
    apiKey: "my-api-key",
    modelId: "model_123",
    prompt: "Hello",
    parameters: { name: "John" },
    config: { temperature: 0.5 },
    options: { track: true },
  };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should make a POST request to the correct URL with the correct data", async () => {
    mockAxios.post.mockResolvedValueOnce({ data: mockResponse });

    const result = await createCompletion(mockInput);

    expect(mockAxios.post).toHaveBeenCalledTimes(1);
    expect(mockAxios.post).toHaveBeenCalledWith(
      "https://api.prompt.studio/api/v1/completion/buffered",
      {
        modelId: "model_123",
        prompt: "Hello",
        parameters: { name: "John" },
        options: { track: true },
      },
      {
        headers: {
          Authorization: "Bearer my-api-key",
          "Content-Type": "application/json",
        },
      }
    );
    expect(result).toEqual(mockResponse);
  });

  it("should throw an error if the request fails", async () => {
    const mockError = new Error("Request failed");
    mockAxios.post.mockRejectedValueOnce(mockError);

    await expect(createCompletion(mockInput)).rejects.toThrow(mockError);
  });
});
