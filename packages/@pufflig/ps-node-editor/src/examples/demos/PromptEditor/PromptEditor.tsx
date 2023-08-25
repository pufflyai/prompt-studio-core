import { Flow, runFlow } from "@pufflig/ps-chains";
import { useState } from "react";

interface PromptEditorProps {
  chain: Flow;
}

const startNodeId = "n2";
const outputNodeId = "n1";

const model = {
  modelId: "text-davinci-003",
  parameters: {
    temperature: 0.1,
  },
};

export const PromptEditor = (props: PromptEditorProps) => {
  const { chain } = props;
  const [chainState, setChainState] = useState(chain.state);

  const runFromStart = async () => {
    if (!startNodeId) return;
    const res = await runFlow(
      { ...chain, state: chainState },
      startNodeId,
      {
        template: "this is a {{test}}",
        model,
        variables: [{ id: "test", type: "text", name: "test", defaultValue: "foobar!", description: "" }],
      },
      {
        onNodeInputUpdate: console.log,
        onNodeRunComplete: console.log,
        onNodeRunError: console.log,
        resolveReferences: async () => {
          return import.meta.env.VITE_OPENAI_API_KEY;
        },
      }
    );
    setChainState(res);
    console.log(res);
  };

  const updateTextNode = async () => {
    if (!startNodeId) return;
    const res = await runFlow(
      { ...chain, state: chainState },
      "n0",
      { text: "this is a test" },
      {
        resolveReferences: async () => {
          return import.meta.env.VITE_OPENAI_API_KEY;
        },
        onNodeRunError: (nodeId, error) => {
          console.log(nodeId, error);
        },
      }
    );
    setChainState(res);
    console.log(res);
  };

  return (
    <div>
      <button onClick={() => runFromStart()}>run from start</button>
      <button onClick={() => updateTextNode()}>update text node</button>
      <div>{JSON.stringify(chainState[outputNodeId]?.input)}</div>
    </div>
  );
};
