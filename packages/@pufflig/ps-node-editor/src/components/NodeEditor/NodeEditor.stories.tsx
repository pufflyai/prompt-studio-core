import { live_chain } from "../../examples/chains/live_chain";
import { prompt_editor_chain } from "../../examples/chains/prompt_editor_chain";
import { ChatEditor } from "../../examples/demos/ChatEditor/ChatEditor";
import { Editable } from "../../examples/demos/Editable/Editable";
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
      <PromptEditor chain={prompt_editor_chain} />
      <NodeEditor chain={prompt_editor_chain} />
    </>
  ),
};

export const ChatEditorDemo = {
  render: () => (
    <>
      <ChatEditor chain={live_chain} />
      <NodeEditor chain={live_chain} />
    </>
  ),
};

export const EditableDemo = {
  render: () => <Editable />,
};
