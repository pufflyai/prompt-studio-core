import { ChatNodeIO, CompletionNodeInput, CompletionNodeOutput, TextParam } from "@pufflig/ps-types";

export interface ModifierSettings {
  variables: {
    [key: string]: string;
  };
}

export interface Modifier {
  modifyCompletion: (input: CompletionNodeInput, options: ModifierSettings) => Promise<CompletionNodeOutput>;
  modifyChat: (input: ChatNodeIO, options: ModifierSettings) => Promise<ChatNodeIO>;
}

export type ModifierNode = "modifiers/handlebarTemplate";

export interface ModifierConfig {
  id: ModifierNode;
  name: string;
  description: string;
  parameters: {
    [key: string]: TextParam;
  };
}
