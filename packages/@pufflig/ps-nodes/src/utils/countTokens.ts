import { TiktokenModel, encoding_for_model } from "@dqbd/tiktoken";

export const countTokens = (code: string, model: TiktokenModel = "gpt-4") => {
  const encoding = encoding_for_model(model);
  const tokens = encoding.encode(code);
  encoding.free();
  return tokens.length;
};
