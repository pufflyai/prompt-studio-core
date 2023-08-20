import { Chain } from "@pufflig/ps-chains";
import { live_chain } from "../../examples/chains/live_chain";
import { prompt_editor_chain } from "../../examples/chains/prompt_editor_chain";
import { ChatEditor } from "../../examples/demos/ChatEditor/ChatEditor";
import { PromptEditor } from "../../examples/demos/PromptEditor/PromptEditor";
import { NodeEditor } from "./NodeEditor";

export default {
  title: "Editors",
  parameters: {
    layout: "fullscreen",
  },
};

export const PromptEditorDemo = {
  render: () => (
    <>
      <PromptEditor chain={prompt_editor_chain as unknown as Chain} />
      <NodeEditor chain={prompt_editor_chain as unknown as Chain} />
    </>
  ),
};

export const ChatEditorDemo = {
  render: () => (
    <>
      <ChatEditor chain={live_chain as unknown as Chain} />
      <NodeEditor chain={live_chain as unknown as Chain} />
    </>
  ),
};
