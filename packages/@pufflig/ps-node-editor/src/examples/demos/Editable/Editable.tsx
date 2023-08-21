import { Box, Button, Flex, Stack, Text } from "@chakra-ui/react";
import { Chain } from "@pufflig/ps-chains";
import { useState } from "react";
import { NodeEditor } from "../../..";
import { empty_chain } from "../../chains/empty_chain";

export const Editable = () => {
  const [chain, setChain] = useState<Chain>(empty_chain as unknown as Chain);

  const addNode = (type: any) => {
    setChain((prev) => {
      const id = Math.random().toString();
      return {
        ...prev,
        definition: {
          ...prev.definition,
          nodes: {
            ...prev.definition.nodes,
            [id]: {
              id,
              type,
              autorun: true,
              editor: {
                position: {
                  x: 0,
                  y: 0,
                },
              },
            },
          },
        },
      };
    });
  };

  return (
    <Box>
      <Stack zIndex="10" position="absolute" background="white" padding="2" color="black" justifyContent="center">
        {Object.entries(chain.nodeTypes).map(([key, nodeType]) => {
          return (
            <Flex justifyContent="space-between" alignItems="center">
              <Text>{nodeType.name}</Text>
              <Button
                size="xs"
                onClick={() => {
                  addNode(key);
                }}
              >
                add
              </Button>
            </Flex>
          );
        })}
      </Stack>
      <NodeEditor chain={chain as unknown as Chain} />
    </Box>
  );
};
