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
  text: "blue",
  number: "green",
  api: "orange",
  chat: "yellow",
  secret: "red",
  message: "teal",
  list: "cyan",
  model: "purple",
  selection: "pink",
  object: "magenta",
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
