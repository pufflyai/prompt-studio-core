import { nodeTypes, nodes } from "@pufflig/ps-nodes-config";
import { refineCompletion } from "@pufflig/ps-sdk";
import { Execute, GetInputDefinition, ModelValue, Node, ObjectDefinition, Param } from "@pufflig/ps-types";
import { getPromptStudioKey } from "../../utils/getPromptStudioKey";
import { extractVariables } from "../../utils/extractVariables";
import Mustache from "mustache";

export interface LLMCompletionInput {
  instructions: string;
  model: ModelValue;
  document: string;
  checklist: ObjectDefinition;
  format: string;
  fields: string[];
  [key: string]: any;
}

export interface LLMCompletionOutput {
  checklist: string;
}

const makeCSVChecklist = (checklist: ObjectDefinition, fields: string[]) => {
  const header = "check," + fields.join(",");
  const rows = checklist.map((row) => {
    return row.id + "," + fields.map(() => "").join(",");
  });

  return `${header}\n${rows.join("\n")}`;
};

const makeMarkdownChecklist = (checklist: ObjectDefinition, fields: string[]) => {
  const header = "|check|" + fields.join("|") + "|";
  const rows = checklist.map((row) => {
    return "|" + row.id + "|" + fields.map(() => "").join("|") + "|";
  });

  return `${header}\n${rows.join("\n")}`;
};

const makeCSVDescription = (checklist: ObjectDefinition) => {
  const header = "check,description";
  const rows = checklist.map((item) => {
    return `${item.id}, ${(item.defaultValue as string).replace(/,/g, "")}`;
  });
  return `${header}\n${rows.join("\n")}`;
};

const makeMarkdownDescription = (checklist: ObjectDefinition) => {
  const header = "|check|description|";
  const rows = checklist.map((item) => {
    return `|${item.id}|${(item.defaultValue as string).replace(/,/g, "")}|`;
  });
  return `${header}\n${rows.join("\n")}`;
};

export const execute: Execute<LLMCompletionInput, LLMCompletionOutput> = async (input, options = {}) => {
  const { instructions, model, document, checklist, fields, format, ...variables } = input;
  const { modelId, parameters } = model;
  const { globals } = options;

  const isCSV = format === "csv";

  // checklist format
  const checkListFormat = isCSV ? makeCSVChecklist(checklist, fields) : makeMarkdownChecklist(checklist, fields);

  // checklist description
  const description = isCSV ? makeCSVDescription(checklist) : makeMarkdownDescription(checklist);

  // TODO: move into the API
  const instructionsWithChecklist = `${instructions}
DOCUMENT:
{{document}}

CHECKLIST DESCRIPTION:
${description}

CHECKLIST FORMAT:
{{table}}

Return only the CHECKLIST IN ${format.toUpperCase()} FORMAT:
${isCSV ? "check," : "|check|"}`;

  // render the prompt without overwriting the document and table variables
  const renderedPrompt = Mustache.render(instructionsWithChecklist, {
    ...variables,
    document: "{{document}}",
    table: "{{table}}",
  });

  const { result } = await refineCompletion({
    apiKey: getPromptStudioKey(globals || {}),
    modelId,
    prompt: renderedPrompt,
    document: document,
    format: checkListFormat,
    parameters,
    config: globals,
    options: {
      cache: true,
      track: true,
    },
  });

  return {
    checklist: result || "",
  };
};

/**
 * Returns a new input definition given variables extracted from the template.
 *
 * @param input
 * @param prev
 * @returns
 */
export const getInputDefinition: GetInputDefinition<LLMCompletionInput> = (input) => {
  const { prompt, document, model, table, ...rest } = input;

  if (prompt === undefined) {
    return nodes[nodeTypes.documentCheckNodeType].inputs;
  }

  const defaults = { prompt, document, model, table };

  const definitionsWithDefaults = nodes[nodeTypes.documentCheckNodeType].inputs.map((input) => {
    if (Object.keys(defaults).includes(input.id)) {
      return {
        ...input,
        defaultValue: defaults[input.id as keyof typeof defaults],
      } as Param;
    }

    return input;
  });

  const extractedVariables = extractVariables(prompt);

  if (extractedVariables) {
    const extractedVariablesWithDefaults = extractedVariables
      .filter((param) => {
        return !Object.keys(defaults).includes(param.id);
      })
      .map((variable) => {
        return {
          ...variable,
          defaultValue: rest[variable.id] || "",
        } as Param;
      });

    return [...definitionsWithDefaults, ...extractedVariablesWithDefaults];
  }

  return definitionsWithDefaults;
};

export const documentCheck: Node = {
  ...nodes[nodeTypes.documentCheckNodeType],
  execute,
  getInputDefinition,
};
