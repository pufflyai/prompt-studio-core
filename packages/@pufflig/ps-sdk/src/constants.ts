export const DEFAULT_SERVICE_URL = "https://api.prompt.studio";

export const getServiceUrl = () => {
  return `${process.env.PROMPT_STUDIO_API_SERVICE_URL || DEFAULT_SERVICE_URL}`;
};

export const getApiServiceWebSocketUrl = () => {
  return `${process.env.PROMPT_STUDIO_API_SERVICE_WEBSOCKET_URL || ""}`;
};
