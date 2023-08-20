import { Chain, runFromNode } from "@pufflig/ps-chains";
import { useState } from "react";

interface PromptEditorProps {
  chain: Chain;
}

const startNodeId = "n2";
const openAINodeId = "n3";
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
    const res = await runFromNode(
      startNodeId,
      {
        template: "this is a {{test}}",
        model,
        variables: [{ id: "test", type: "text", name: "test", defaultValue: "foobar!", description: "" }],
      },
      { ...chain, state: chainState },
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

  const runCompletion = async () => {
    if (!startNodeId) return;
    const res = await runFromNode(
      openAINodeId,
      {},
      { ...chain, state: chainState },
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
      <button onClick={() => runCompletion()}>run completion</button>
      <div>{JSON.stringify(chainState[outputNodeId]?.input)}</div>
    </div>
  );
};
