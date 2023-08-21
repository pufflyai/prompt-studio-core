import { Box, Flex, Heading, Spacer, Stack, useColorMode } from "@chakra-ui/react";
import { borderColors, sectionColors } from "@pufflig/ps-ui";
import { CustomHandle } from "../CustomHandle/CustomHandle";

interface CustomNodeProps {
  id: string;
  data: any;
}

export function CustomNode({ id, data }: CustomNodeProps) {
  const { colorMode } = useColorMode();
  return (
    <Box
      bg={sectionColors[colorMode]["modal"]}
      padding="4"
      borderRadius="4"
      width={"420px"}
      border={`1px solid ${borderColors[colorMode].SECONDARY}`}
    >
      <Heading size="sm" noOfLines={1}>
        {data.label}
      </Heading>
      {id}
      <Spacer height="4" />
      <Stack gap="4">
        {Object.keys(data.inputs).map((handleId) => (
          <Flex gap="4" alignItems={"center"} justifyContent="left" position="relative">
            <span style={{ paddingLeft: "18px" }}>{handleId}</span>
            <CustomHandle handleId={handleId} direction="left" type={data.inputs[handleId].type} />
          </Flex>
        ))}
        {Object.keys(data.outputs).map((handleId) => (
          <Flex gap="4" alignItems={"center"} justifyContent="right" position="relative">
            <span>{handleId}</span>
            <CustomHandle handleId={handleId} direction="right" type={data.outputs[handleId].type} />
          </Flex>
        ))}
      </Stack>
    </Box>
  );
}
