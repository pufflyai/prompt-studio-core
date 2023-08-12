export type NodeCategory = "input" | "modifier" | "adapter" | "converter" | "output";
export type DataFormat = "text" | "chat";

export interface UserSettings {
  name: string;
  description: string;
  settings: {
    [key: string]: {
      name: string;
      description: string;
      type: "secret" | "text";
    };
  };
}
