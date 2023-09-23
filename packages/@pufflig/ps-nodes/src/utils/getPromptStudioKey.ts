const promptStudioKey = "ps/api_key";

export const getPromptStudioKey = (globals: Record<string, string>) => {
  return globals[promptStudioKey];
};
