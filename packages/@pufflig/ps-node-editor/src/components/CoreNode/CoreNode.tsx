import { Handle, Position } from "reactflow";

export function CoreNode(props: any) {
  const { data, id } = props;
  const isInput = data.type == "core/input";
  const paramPosition = isInput ? Position.Right : Position.Left;
  return (
    <div className="custom-node__core">
      <div className="custom-node__header">
        ({id}){data.label}
      </div>
      <div className="custom-node__body" style={{ display: "flex", gap: "4px" }}>
        {Object.keys(data.parameters).map((handleId) => (
          <div className="custom-node__select">
            <span style={!isInput ? { paddingLeft: "12px" } : { paddingRight: "12px" }}>{handleId}</span>
            <Handle type={isInput ? "source" : "target"} position={paramPosition} id={handleId} />
          </div>
        ))}
        <div className="custom-node__select">
          <Handle type="source" position={paramPosition} id={"new"} />
        </div>
      </div>
    </div>
  );
}
