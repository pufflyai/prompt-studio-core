export const SERVICE_URL = "https://api.prompt.studio/api/v1/completion";

export const getServiceUrl = () => {
  return process.env.PROMPT_STUDIO_SERVICE_URL || SERVICE_URL;
};
