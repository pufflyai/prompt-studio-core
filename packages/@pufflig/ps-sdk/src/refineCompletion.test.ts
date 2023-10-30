import { refineCompletion } from "./refineCompletion";
import axios from "axios";

jest.mock("axios");

describe("refineCompletion", () => {
  const mockAxios = axios as jest.Mocked<typeof axios>;

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should return the completion object", async () => {
    const mockCompletion = {
      datapoint: {
        model_output: "output",
        model_input: "input",
        model_id: "id",
      },
    };
    mockAxios.post.mockResolvedValue({ data: mockCompletion });

    const input = {
      apiKey: "api-key",
      modelId: "model-id",
      prompt: "prompt",
      format: "format",
      document: "document",
      parameters: { param1: "value1", param2: "value2" },
      config: { config1: "value1", config2: "value2" },
      options: { track: true, cache: false },
    };

    const result = await refineCompletion(input);

    expect(mockAxios.post).toHaveBeenCalledTimes(1);
    expect(mockAxios.post).toHaveBeenCalledWith(
      "https://api.prompt.studio/api/v1/completion/looped",
      {
        prompt: "prompt",
        format: "format",
        document: "document",
        modelId: "model-id",
        parameters: { param1: "value1", param2: "value2" },
        config: { config1: "value1", config2: "value2" },
        options: { track: true, cache: false },
      },
      {
        headers: {
          Authorization: "Bearer api-key",
          "Content-Type": "application/json",
        },
      }
    );
    expect(result).toEqual(mockCompletion);
  });

  it("should throw an error if the API call fails", async () => {
    const mockError = new Error("API call failed");
    mockAxios.post.mockRejectedValueOnce(mockError);

    const input = {
      apiKey: "api-key",
      modelId: "model-id",
      prompt: "prompt",
      format: "format",
      document: "document",
    };

    await expect(refineCompletion(input)).rejects.toThrow(mockError);
  });
});
