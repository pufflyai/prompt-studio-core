import { Box, Button, Code } from "@chakra-ui/react";
import { Flow, runFlow } from "@pufflig/ps-chains";
import { ChatMessage } from "@pufflig/ps-types";
import { useState } from "react";

interface PromptEditorProps {
  chain: Flow;
}

const startNodeId = "0e3f8188-8217-4aa5-9982-947aaa7601d6"; // "5";
const outputNodeId = "ec63e440-81bd-46d9-a9ab-91c4dd78e21d"; //"1";

const model = {
  modelId: "gpt-3.5-turbo",
  parameters: {
    temperature: 0.1,
  },
};

export const ChatEditor = (props: PromptEditorProps) => {
  const { chain } = props;
  const [chainState, setChainState] = useState(chain.state);

  const runFromStart = async () => {
    if (!startNodeId) return;
    const res = await runFlow(
      { ...chain, state: chainState },
      startNodeId,
      {
        chat: { messages: [] },
        message: {
          id: "1",
          content: "hi there, could you tell me what time it is?",
          createdAt: new Date().toISOString(),
          role: "user",
        } as ChatMessage,
        model,
      },
      {
        logLevel: "debug",
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

  return (
    <Box>
      <Button onClick={() => runFromStart()}>run from start</Button>
      <Box>
        <Code>{JSON.stringify(chainState[outputNodeId]?.input, null, 2)}</Code>
      </Box>
    </Box>
  );
};
