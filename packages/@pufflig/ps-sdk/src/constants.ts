export const SERVICE_URL = "https://api.prompt.studio";

export const getServiceUrl = () => {
  return `${process.env.PROMPT_STUDIO_SERVICE_BASE_URL || SERVICE_URL}`;
};
