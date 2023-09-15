import { Box } from "@chakra-ui/react";
import { Param } from "@pufflig/ps-types";
import { borderColors } from "@pufflig/ps-ui";
import { Handle, Position } from "reactflow";

interface CustomHandleProps {
  handleId: string;
  direction: "left" | "right";
  type: Param["type"];
}

const dataTypeColors: { [key in Param["type"]]: string } = {
  text: "#264653",
  number: "#2A9D8F",
  api: "#E9C46A",
  chat: "#F4A261",
  message: "#E76F51",
  list: "cyan",
  model: "purple",
  selection: "pink",
  object: "magenta",
  vector: "red",
};

export function CustomHandle(props: CustomHandleProps) {
  const { handleId, direction, type } = props;
  const isTarget = direction === "left";
  return (
    <Box>
      <Handle
        style={{
          background: dataTypeColors[type],
          height: "12px",
          width: "12px",
          border: "1px solid",
          borderColor: borderColors["light"].SECONDARY,
        }}
        type={isTarget ? "target" : "source"}
        position={isTarget ? Position.Left : Position.Right}
        id={handleId}
      />
    </Box>
  );
}
