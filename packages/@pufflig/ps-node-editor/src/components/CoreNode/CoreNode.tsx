import { Box, Flex, Heading, Spacer, Stack, useColorMode } from "@chakra-ui/react";
import { borderColors, sectionColors } from "@pufflig/ps-ui";
import { CustomHandle } from "../CustomHandle/CustomHandle";

export function CoreNode(props: any) {
  const { colorMode } = useColorMode();
  const { data, id } = props;
  const isInput = data.type == "core/input";
  return (
    <Box
      bg={sectionColors[colorMode]["base"]}
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
        {Object.keys(data.parameters).map((handleId) => (
          <Flex key={handleId} gap="4" alignItems={"center"} justifyContent="left" position="relative">
            <span style={!isInput ? { paddingLeft: "12px" } : { paddingRight: "12px" }}>{handleId}</span>
            <CustomHandle
              direction={isInput ? "right" : "left"}
              handleId={handleId}
              type={data.parameters[handleId].type}
            />
          </Flex>
        ))}
      </Stack>
    </Box>
  );
}
