import OpenAI from "openai";
import { long_text } from "./mock_data/long_text";
import { parseDocument, ParseDocumentInput } from "./parse_document";

// Mock the OpenAI API module
jest.mock("openai");
const mockedOpenAI = jest.mocked(OpenAI);

describe("parseDocument", () => {
  afterEach(() => {
    mockedOpenAI.prototype.chat.completions.create.mockReset();
  });

  it("runs the prompt once if the document is short", async () => {
    const input: ParseDocumentInput = {
      prompt: "This is a prompt [[document]]",
      document: "This is a document",
      join: "",
    };

    const mockResponse = {
      data: {
        choices: [
          {
            message: { content: "This is the generated text" },
          },
        ],
      },
    };

    mockedOpenAI.prototype.chat.completions.create.mockResolvedValueOnce(
      new Promise((res) => res(mockResponse)) as any
    );

    const output = await parseDocument.execute?.(input);

    expect(output?.text).toEqual(mockResponse.data.choices[0].message.content);
    expect(mockedOpenAI.prototype.chat.completions.create).toHaveBeenCalledTimes(1);
  });

  it("runs the prompt several times if the document is too long", async () => {
    const input: ParseDocumentInput = {
      prompt: "This is a prompt [[document]]",
      document: long_text,
      join: "",
    };

    const mockResponse = {
      data: {
        choices: [
          {
            message: { content: "This is the generated text" },
          },
        ],
      },
    };

    mockedOpenAI.prototype.chat.completions.create.mockResolvedValue(new Promise((res) => res(mockResponse)) as any);

    const output = await parseDocument.execute?.(input);

    const result = "This is the generated text\nThis is the generated text\nThis is the generated text";

    expect(output?.text).toEqual(result);
    expect(mockedOpenAI.prototype.chat.completions.create).toHaveBeenCalledTimes(3);
  });

  it("if there are several resulting outputs, they are joined using the join prompt", async () => {
    const input: ParseDocumentInput = {
      prompt: "Summarize the document:\n[[document]]",
      document: long_text,
      join: "Join the sections below:\n[[document]]",
    };

    const mockResponse = {
      data: {
        choices: [
          {
            message: { content: "This is the generated text" },
          },
        ],
      },
    };

    mockedOpenAI.prototype.chat.completions.create.mockResolvedValue(new Promise((res) => res(mockResponse)) as any);

    const output = await parseDocument.execute?.(input);

    expect(output?.text).toEqual(mockResponse.data.choices[0].message.content);
    expect(mockedOpenAI.prototype.chat.completions.create).toHaveBeenCalledTimes(4);
  });
});
