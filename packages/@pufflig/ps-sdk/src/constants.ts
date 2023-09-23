export const SERVICE_URL = "https://api.prompt.studio/api/v1/completion";

export const getServiceUrl = () => {
  if (process.env.PROMPT_STUDIO_RUNTIME === "local") {
    return "http://localhost:8088/api/v1/completion";
  }
  return SERVICE_URL;
};
