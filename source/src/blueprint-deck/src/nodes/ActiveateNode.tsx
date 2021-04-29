import React from "react";
import { Handle, Node, Position } from "react-flow-renderer";
import { NodeData } from "../NodeData";
import { NodeTitle } from "./NodeTitle";

const ActivateNode = (node: Node<NodeData>) => {
  return (
    <>
      <NodeTitle label={"Activation"} />
      <Handle
        key={"Event"}
        id={"Event"}
        type={"source"}
        position={Position.Right}
      />
    </>
  );
};

export default ActivateNode;
