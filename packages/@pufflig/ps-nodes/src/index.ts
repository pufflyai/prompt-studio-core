import { NodeType } from "@pufflig/ps-nodes-config";
import { runOpenAiChat } from "./adapters/openai_chat";
import { runOpenAiCompletion } from "./adapters/openai_completion";
import { runHandlebarTemplateChat } from "./modifiers/handlebar_template_chat";
import { runHandlebarTemplateCompletion } from "./modifiers/handlebar_template_completion";

type Nodes = Record<NodeType, (input: any) => Promise<Record<string, any>>>;

export const nodes: Nodes = {
  "adapter/custom_api_chat": async () => ({}),
  "adapter/custom_api_completion": async () => ({}),
  "adapter/openai_chat": runOpenAiChat,
  "adapter/openai_completion": runOpenAiCompletion,
  "input/template_editor": async () => ({}), // TODO: remove
  "modifier/handlebar_template_chat": runHandlebarTemplateChat,
  "modifier/handlebar_template_completion": runHandlebarTemplateCompletion,
  "output/chat_display": async () => ({}), // TODO: remove
  "output/completion_display": async () => ({}), // TODO: remove
};
