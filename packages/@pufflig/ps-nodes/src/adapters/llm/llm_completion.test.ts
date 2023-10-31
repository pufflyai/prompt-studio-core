import { execute, getInputDefinition } from "./llm_completion";

jest.mock("@pufflig/ps-sdk", () => ({
  createCompletion: jest.fn(async () => ({
    datapoint: {
      model_output: "test output",
    },
  })),
}));

const { createCompletion } = require("@pufflig/ps-sdk");

describe("llm_completion - execute", () => {
  it("should return a completion given correct input values", async () => {
    const input = {
      prompt: "prompt",
      model: {
        modelId: "modelId",
        parameters: {
          parameter: 1,
        },
      },
    };

    const globals = {
      ["ps/api_key"]: "token",
      testValue: "value",
    };

    const result = await execute(input, { globals });

    expect(createCompletion).toHaveBeenCalledWith({
      apiKey: "token",
      modelId: "modelId",
      prompt: "prompt",
      parameters: {
        parameter: 1,
      },
      config: {
        ["ps/api_key"]: "token",
        testValue: "value",
      },
      options: {
        cache: true,
        track: true,
      },
    });

    expect(result).toEqual({
      completion: "test output",
    });
  });
});

test("getInputDefinition - no variables", () => {
  const variables = getInputDefinition({
    prompt: `summarize {{longText}}`,
    model: {
      modelId: "test",
      parameters: {},
    },
  });
  expect(variables).toMatchSnapshot();
});

test("getInputDefinition - if you pass a template and a variable, take value of the variable", () => {
  const variables = getInputDefinition({
    prompt: `summarize {{longText}}`,
    model: {
      modelId: "test",
      parameters: {},
    },
    longText: "some long text",
  });
  expect(variables).toMatchSnapshot();
});

test("getInputDefinition - ignores non existing variables", () => {
  const variables = getInputDefinition({
    prompt: `summarize {{longText}}`,
    model: {
      modelId: "test",
      parameters: {},
    },
    otherVariable: "",
  });
  expect(variables).toMatchSnapshot();
});
