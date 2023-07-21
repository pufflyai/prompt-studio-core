import { ChatNodeIO, CompletionNodeIO, TextParam } from "@pufflig/ps-types";

export interface ModifierSettings {
  variables: {
    [key: string]: string;
  };
}

export interface Modifier {
  modifyCompletion: (input: CompletionNodeIO, options: ModifierSettings) => Promise<CompletionNodeIO>;
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
