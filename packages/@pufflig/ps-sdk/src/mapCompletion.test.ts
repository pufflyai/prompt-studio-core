import { mapCompletion } from "./mapCompletion";
import axios from "axios";

jest.mock("axios");

describe("mapCompletion", () => {
  const mockAxios = axios as jest.Mocked<typeof axios>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return completions for each chunk of the document", async () => {
    const input = {
      apiKey: "myApiKey",
      modelId: "myModelId",
      prompt: "myPrompt",
      document: "myDocument",
      parameters: { myParam: "myValue" },
      config: { myConfig: "myValue" },
      options: { track: true, cache: false },
    };

    const mockResponse = {
      data: {
        completions: [
          {
            datapoints: {
              model_output: "output1",
              model_input: "input1",
              model_id: "id1",
            },
          },
          {
            datapoints: {
              model_output: "output2",
              model_input: "input2",
              model_id: "id2",
            },
          },
        ],
      },
    };

    mockAxios.post.mockResolvedValueOnce(mockResponse);

    const result = await mapCompletion(input);

    expect(mockAxios.post).toHaveBeenCalledTimes(1);
    expect(mockAxios.post).toHaveBeenCalledWith(
      "https://api.prompt.studio/api/v1/completion/mapped",
      {
        prompt: "myPrompt",
        document: "myDocument",
        modelId: "myModelId",
        parameters: { myParam: "myValue" },
        config: { myConfig: "myValue" },
        options: { track: true, cache: false },
      },
      {
        headers: {
          Authorization: "Bearer myApiKey",
          "Content-Type": "application/json",
        },
      }
    );

    expect(result).toEqual({
      completions: [
        {
          datapoints: {
            model_output: "output1",
            model_input: "input1",
            model_id: "id1",
          },
        },
        {
          datapoints: {
            model_output: "output2",
            model_input: "input2",
            model_id: "id2",
          },
        },
      ],
    });
  });
});
