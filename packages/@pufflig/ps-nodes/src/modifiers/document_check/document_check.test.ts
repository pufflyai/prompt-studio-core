import { execute, LLMCompletionInput } from "./document_check";
import axios from "axios";

jest.mock("axios");

describe("documentCheck", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should return the completion string", async () => {
    const input: LLMCompletionInput = {
      prompt: "Hello, world!",
      model: {
        modelId: "test_model",
        parameters: {},
      },
      document: "This is a test document.",
      table: "test_table",
    };

    const expectedOutput = { result: "This is a test completion." };
    const mockedAxiosResponse = { data: expectedOutput };
    (axios.post as jest.MockedFunction<typeof axios.post>).mockResolvedValueOnce(mockedAxiosResponse);

    const output = await execute(input);

    expect(output).toEqual({ completion: "This is a test completion." });
    expect(axios.post).toHaveBeenCalledTimes(1);
  });

  it("should parse input variables", async () => {
    const input: LLMCompletionInput = {
      prompt: "Hello, {{myVariable}}!",
      model: {
        modelId: "test_model",
        parameters: {},
      },
      document: "This is a test document.",
      table: "test_table",
      myVariable: "myValue",
    };

    const expectedOutput = { result: "This is a test completion." };
    const mockedAxiosResponse = { data: expectedOutput };
    (axios.post as jest.MockedFunction<typeof axios.post>).mockResolvedValueOnce(mockedAxiosResponse);

    const output = await execute(input);

    expect(output).toEqual({ completion: "This is a test completion." });
    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith(
      expect.any(String),
      {
        document: "This is a test document.",
        format: "test_table",
        modelId: "test_model",
        options: {
          cache: true,
          track: true,
        },
        parameters: {},
        prompt: "Hello, myValue!",
      },
      {
        headers: {
          Authorization: "Bearer undefined",
          "Content-Type": "application/json",
        },
      }
    );
  });

  it("should throw an error if the API call fails", async () => {
    const input: LLMCompletionInput = {
      prompt: "Hello, world!",
      model: {
        modelId: "test_model",
        parameters: {},
      },
      document: "This is a test document.",
      table: "test_table",
    };

    const expectedError = new Error("API call failed.");
    (axios.post as jest.MockedFunction<typeof axios.post>).mockRejectedValueOnce(expectedError);

    await expect(execute(input)).rejects.toThrow(expectedError);
    expect(axios.post).toHaveBeenCalledTimes(1);
  });
});
