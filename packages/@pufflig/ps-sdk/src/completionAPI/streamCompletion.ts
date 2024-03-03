import pino from "pino";
import { WebSocket } from "unws";
import { getApiServiceWebSocketUrl } from "../constants";
import { CreateCompletionInput, CreateCompletionPayload } from "../types";

const logger = pino();
const WAIT_FOR_CHUNKS_MS = 50;

interface MessageData {
  datapoint: {
    model_output: string;
    is_error?: boolean;
    error?: string;
  };
  request: { is_cached: boolean };
}

interface MessageEvent {
  data: string;
}

enum MessageType {
  chunk = "chunk",
  end = "end",
}

class StreamedCompletionResponseMessage {
  type: MessageType;
  data: MessageData | undefined;

  constructor(type: MessageType, data?: MessageData) {
    this.type = type;
    this.data = data;
  }
}

enum StreamedCompletionRequestType {
  CompletionRequestStart = "CompletionRequestStart",
}

class StreamedCompletionRequestMessage {
  type: StreamedCompletionRequestType;
  token: string;
  payload: CreateCompletionPayload;

  constructor(type: StreamedCompletionRequestType, token: string, payload: CreateCompletionPayload) {
    this.type = type;
    this.token = token;
    this.payload = payload;
  }
}

export async function* streamCompletion(input: CreateCompletionInput) {
  //TODO: get logger level from env variables
  logger.level = "info";

  const { modelId, prompt, apiKey, tags, options, parameters = {} } = input;
  const completionChunks: any[] = [];
  let streamEnded = false;

  const payload: CreateCompletionPayload = {
    modelId,
    prompt,
    parameters,
  };

  if (tags) {
    payload.tags = tags;
  }

  if (options) {
    payload.options = options;
  }

  let websocket: any;
  try {
    websocket = new WebSocket(`${getApiServiceWebSocketUrl()}/api/v1/completion/streamed`);
  } catch (error) {
    logger.error("Couldn't create websocket", error);
    return;
  }

  websocket.onopen = () => {
    const requestStartMessage = new StreamedCompletionRequestMessage(
      StreamedCompletionRequestType.CompletionRequestStart,
      apiKey,
      payload
    );
    websocket.send(JSON.stringify(requestStartMessage));
  };

  websocket.onerror = (err: Error) => {
    logger.error("SDK:CompletionStreamError", err.message);
    const errorMessage = {
      datapoint: {
        is_error: true,
        error: err.message,
      },
    };
    completionChunks.push(errorMessage);
    streamEnded = true;
    websocket.close();
  };

  websocket.onmessage = (event: MessageEvent) => {
    const message = JSON.parse(event.data) as StreamedCompletionResponseMessage;
    if (message.type === MessageType.end) {
      streamEnded = true;
      websocket.close();
    } else {
      completionChunks.push(message.data);
    }
  };

  websocket.onclose = () => {
    streamEnded = true;
  };

  while (completionChunks.length > 0 || !streamEnded) {
    if (completionChunks.length > 0) {
      yield completionChunks.shift();
    } else {
      await new Promise((resolve) => setTimeout(resolve, WAIT_FOR_CHUNKS_MS)); // Wait for chunks to arrive
    }
  }
}
