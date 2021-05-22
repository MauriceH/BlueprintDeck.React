import React from "react";
import { Handle, Node, Position } from "react-flow-renderer";
import { NodeData } from "../../model/NodeData";
import { NodeTitle } from "../NodeTitle";
import {BaseNode} from "../BaseNode";

const TimeSpanConstantValueContent = ({ node }: { node: Node<NodeData> }) => {
  return (
    <div style={{ marginTop: "15px", marginBottom: '25px' }}>
      <input type={"time"} step={2} />
    </div>
  );
};

const Int32ConstantValueContent = ({ node }: { node: Node<NodeData> }) => {
  return (
    <div style={{ marginTop: "15px", marginBottom: '25px' }}>
      <input type={"number"} style={{width: '80px'}} />
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
