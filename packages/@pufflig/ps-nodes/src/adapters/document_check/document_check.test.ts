import axios from "axios";
import { execute, getInputDefinition, LLMCompletionInput } from "./document_check";

jest.mock("axios");

describe("documentCheck", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should return the resulting checklist", async () => {
    const input: LLMCompletionInput = {
      instructions: "Hello, world!",
      model: {
        modelId: "test_model",
        parameters: {},
      },
      document: "This is a test document.",
      checks: [{ id: "is_greeting", defaultValue: "test_table", type: "text", name: "is_greeting", description: "" }],
      fields: ["ok"],
      format: "csv",
    };

    const expectedOutput = { result: "mock checklist" };
    const mockedAxiosResponse = { data: expectedOutput };
    (axios.post as jest.MockedFunction<typeof axios.post>).mockResolvedValueOnce(mockedAxiosResponse);

    const output = await execute(input);

    expect(output).toEqual({ checklist: expectedOutput.result });
    expect(axios.post).toHaveBeenCalledTimes(1);
  });

  it("should parse input variables", async () => {
    const input: LLMCompletionInput = {
      instructions: "Hello, {{world}}! Run a checklist on the following document:",
      model: {
        modelId: "test_model",
        parameters: {},
      },
      document: "This is a test document.",
      checks: [
        {
          id: "is_greeting",
          defaultValue: "is the text a greeting?",
          type: "text",
          name: "is_greeting",
          description: "",
        },
        {
          id: "is_formal",
          defaultValue: "is the greeting formal?",
          type: "text",
          name: "is_formal",
          description: "",
        },
      ],
      fields: ["ok"],
      format: "csv",
      world: "test",
    };

    const expectedOutput = { result: "This is a test completion." };
    const mockedAxiosResponse = { data: expectedOutput };
    (axios.post as jest.MockedFunction<typeof axios.post>).mockResolvedValueOnce(mockedAxiosResponse);

    const output = await execute(input);

    expect(output).toEqual({ checklist: expectedOutput.result });
    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith(
      expect.any(String),
      {
        document: "This is a test document.",
        format: `check,ok
is_greeting,
is_formal,`,
        modelId: "test_model",
        options: {
          cache: true,
          track: true,
        },
        parameters: {},
        prompt: `Hello, test! Run a checklist on the following document:
DOCUMENT:
{{document}}

CHECKLIST DESCRIPTION:
check,description
is_greeting, is the text a greeting?
is_formal, is the greeting formal?

TABLE FORMAT:
{{table}}

Return only the TABLE IN CSV FORMAT:`,
      },
      {
        headers: {
          Authorization: "Bearer undefined",
          "Content-Type": "application/json",
        },
      }
    );
  });

  it("should parse input variables", async () => {
    const input: LLMCompletionInput = {
      instructions: "Hello, {{world}}! Run a checklist on the following document:",
      model: {
        modelId: "test_model",
        parameters: {},
      },
      document: "This is a test document.",
      checks: [
        {
          id: "is_greeting",
          defaultValue: "is the text a greeting?",
          type: "text",
          name: "is_greeting",
          description: "",
        },
        {
          id: "is_formal",
          defaultValue: "is the greeting formal?",
          type: "text",
          name: "is_formal",
          description: "",
        },
      ],
      fields: ["ok"],
      format: "markdown",
      world: "test",
    };

    const expectedOutput = { result: "This is a test completion." };
    const mockedAxiosResponse = { data: expectedOutput };
    (axios.post as jest.MockedFunction<typeof axios.post>).mockResolvedValueOnce(mockedAxiosResponse);

    const output = await execute(input);

    expect(output).toEqual({ checklist: expectedOutput.result });
    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith(
      expect.any(String),
      {
        document: "This is a test document.",
        format: `|check|ok|
|is_greeting||
|is_formal||`,
        modelId: "test_model",
        options: {
          cache: true,
          track: true,
        },
        parameters: {},
        prompt: `Hello, test! Run a checklist on the following document:
DOCUMENT:
{{document}}

CHECKLIST DESCRIPTION:
|check|description|
|is_greeting|is the text a greeting?|
|is_formal|is the greeting formal?|

TABLE FORMAT:
{{table}}

Return only the TABLE IN MARKDOWN FORMAT:`,
      },
      {
        headers: {
          Authorization: "Bearer undefined",
          "Content-Type": "application/json",
        },
      }
    );
  });

  it("should extract variables correctly", async () => {
    const output = getInputDefinition({
      instructions: "Hello, {{world}}!",
      model: {
        modelId: "test_model",
        parameters: {},
      },
      document: "This is a test document.",
      checks: [
        {
          id: "is_greeting",
          defaultValue: "is the text a greeting?",
          type: "text",
          name: "is_greeting",
          description: "",
        },
        {
          id: "is_formal",
          defaultValue: "is the greeting formal?",
          type: "text",
          name: "is_formal",
          description: "",
        },
      ],
      fields: ["ok"],
      format: "csv",
      world: "test",
    });

    expect(output).toMatchSnapshot();
  });

  it("should throw an error if the API call fails", async () => {
    const input: LLMCompletionInput = {
      instructions: "Hello, world!",
      model: {
        modelId: "test_model",
        parameters: {},
      },
      document: "This is a test document.",
      checks: [{ id: "is_greeting", defaultValue: "test_table", type: "text", name: "is_greeting", description: "" }],
      fields: ["ok"],
      format: "csv",
    };

    const expectedError = new Error("API call failed.");
    (axios.post as jest.MockedFunction<typeof axios.post>).mockRejectedValueOnce(expectedError);

    await expect(execute(input)).rejects.toThrow(expectedError);
    expect(axios.post).toHaveBeenCalledTimes(1);
  });
});
