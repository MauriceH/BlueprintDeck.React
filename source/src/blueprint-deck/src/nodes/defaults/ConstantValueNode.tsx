import React from "react";
import { Handle, Node, Position } from "react-flow-renderer";
import { NodeData } from "../../NodeData";
import { NodeTitle } from "../NodeTitle";
import {BaseNode} from "../BaseNode";

const TimeSpanConstantValueContent = ({ node }: { node: Node<NodeData> }) => {
  return (
    <div style={{ marginBottom: "10px" }}>
      <input type={"time"} step={2} />
    </div>
  );
};

const Int32ConstantValueContent = ({ node }: { node: Node<NodeData> }) => {
  return (
    <div style={{ marginBottom: "10px" }}>
      <input type={"number"} />
    </div>
  );
};

const Content = ({ node }: { node: Node<NodeData> }) => {
  if (node.data?.constantValueDataType === "timespan")
    return <TimeSpanConstantValueContent node={node} />;
  if (node.data?.constantValueDataType === "int32")
    return <Int32ConstantValueContent node={node} />;
  return <p>TYPE NOT AVAILABLE</p>;
};

const ConstantValueNode = (node: Node<NodeData>) => {
  return (
    <BaseNode node={node}>
        <Content node={node}/>
    </BaseNode>
  );
};

export default ConstantValueNode;