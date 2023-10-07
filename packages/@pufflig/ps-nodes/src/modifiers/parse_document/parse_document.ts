import { OPENAI_API_KEY } from "@pufflig/ps-models";
import { nodeTypes, nodes } from "@pufflig/ps-nodes-config";
import { Execute, Node } from "@pufflig/ps-types";
import { Document } from "langchain/document";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import Mustache from "mustache";
import { Configuration, OpenAIApi } from "openai";
import { countTokens } from "../../utils/countTokens";

export interface ParseDocumentInput {
  prompt: string;
  document: string;
  join: string;
}

export interface ParseDocumentOutput {
  text: string;
}

function delay(time: number) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

const model = "gpt-3.5-turbo-16k";
const MAX_TOKENS = 8000;
const MAX_CONCURRENCY = 2;

const tags = ["[[", "]]"] as [string, string];

/**
 * Runs a prompt across a variable length input. Map the prompt across chunks, concatenate or reduce the result
 * using the join prompt. If no join prompt is provided, the first result will be returned.
 *
 * @param input
 * @param options
 * @returns
 */
export const execute: Execute<ParseDocumentInput, ParseDocumentOutput> = async (input, options = {}) => {
  const { prompt, document } = input;
  const { globals } = options;

  // check the number of chunks required
  const promptLength = countTokens(prompt);
  const remainingTokens = MAX_TOKENS - promptLength;

  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: remainingTokens * 2.9,
    chunkOverlap: 10,
  });

  const chunks = await splitter.createDocuments([document]);

  // group chunks based on the max concurrency
  const chunkGroups: Document[][] = [];
  let chunkGroup: Document[] = [];
  for (const chunk of chunks) {
    if (chunkGroup.length >= MAX_CONCURRENCY) {
      chunkGroups.push(chunkGroup);
      chunkGroup = [];
    }
    chunkGroup.push(chunk);
  }
  chunkGroups.push(chunkGroup);
  // --

  const configuration = new Configuration({ apiKey: globals?.[OPENAI_API_KEY] });
  const openai = new OpenAIApi(configuration);

  const completions = [];

  for (const chunkGroup of chunkGroups) {
    const promises: Promise<any>[] = [];

    for (const chunk of chunkGroup) {
      const content = Mustache.render(prompt, { document: chunk.pageContent }, {}, { tags });
      const message = { content, role: "system" as const };
      promises.push(
        openai.createChatCompletion({
          model,
          messages: [message],
          temperature: 0,
          max_tokens: remainingTokens - 1,
        })
      );
      await delay(500);
    }

    const results = (await Promise.all(promises)).map((completion) => {
      const chatCompletion = completion.data.choices[0].message?.content || "";
      return chatCompletion;
    });

    completions.push(...results);
  }

  // if there is only one chunk, return the result
  if (completions.length <= 1) {
    return {
      text: completions[0] || "",
    };
  }

  // if there is no join prompt, return the concatenated results
  if (!input.join) {
    return {
      text: completions.reduce((acc, cur) => {
        if (!acc) return cur;
        return acc + "\n" + cur;
      }, ""),
    };
  }

  // join the chunks while respecting the max tokens
  const reduced = [];
  let rejoined = "";

  for (const completion of completions) {
    if (countTokens(input.join) + countTokens(rejoined) + countTokens(completion) > MAX_TOKENS) {
      reduced.push(rejoined);
      rejoined = "";
    }
    rejoined += "\n\n####\n\n" + completion;
  }
  reduced.push(rejoined);

  // group items based on the max concurrency
  const reducedGroups: string[][] = [];
  let reduceGroup: string[] = [];
  for (const r of reduced) {
    if (reduceGroup.length >= MAX_CONCURRENCY) {
      reducedGroups.push(reduceGroup);
      reduceGroup = [];
    }
    reduceGroup.push(r);
  }
  reducedGroups.push(reduceGroup);
  // --

  // Recursively reduce the chunks if we cannot fit them into the max tokens.
  // TODO: Currently we only return the first result of the reduction.

  // reduce using the join prompt
  const reduceCompletions = [];

  for (const reducedAnswers of reducedGroups) {
    const promises: Promise<any>[] = [];

    for (const answer of reducedAnswers) {
      // insert the chunk into the prompt
      const joinPrompt = Mustache.render(input.join, { document: answer }, {}, { tags });
      const message = { content: joinPrompt, role: "system" as const };
      // run the completion on the chunk
      const remainingTokens = MAX_TOKENS - countTokens(joinPrompt);
      promises.push(
        openai.createChatCompletion({
          model,
          messages: [message],
          temperature: 0,
          max_tokens: remainingTokens - 1,
        })
      );
      // avoid 429 errors from the Openai API.
      await delay(500);
    }

    const results = (await Promise.all(promises)).map((completion) => {
      const result = completion.data.choices[0].message?.content || "";
      return result;
    });

    reduceCompletions.push(...results);
  }

  return {
    // temporary solution
    text: reduceCompletions[0],
  };
};

export const parseDocument: Node<ParseDocumentInput, ParseDocumentOutput> = {
  ...nodes[nodeTypes.parseDocumentNodeType],
  execute,
};
