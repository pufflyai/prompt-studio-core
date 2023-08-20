import { Handle, Position } from "reactflow";

export function CustomNode({ id, data }: any) {
  return (
    <div className="custom-node">
      <div className="custom-node__header">
        ({id}){data.label}
      </div>
      <div className="custom-node__body" style={{ display: "flex", gap: "4px" }}>
        {Object.keys(data.inputs).map((handleId) => (
          <div className="custom-node__select">
            <span style={{ paddingLeft: "12px" }}>{handleId}</span>
            <Handle type="target" position={Position.Left} id={handleId} />
          </div>
        ))}
        {Object.keys(data.outputs).map((handleId) => (
          <div className="custom-node__select">
            <span>{handleId}</span>
            <Handle type="source" position={Position.Right} id={handleId} />
          </div>
        ))}
      </div>
    </div>
  );
}
