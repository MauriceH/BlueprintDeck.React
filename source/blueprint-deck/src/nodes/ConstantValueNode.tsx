import {NodeData} from "../NodeData";
import {Handle, Node, Position} from "react-flow-renderer";
import {NodeTitle} from "./NodeTitle";

const TimeSpanConstantValueContent = ({node}:{node: Node<NodeData>}) => {
    return (
        <div style={{marginBottom:'10px'}}>
            <input type={'time'} step={2} />
        </div>
    );
}

const Int32ConstantValueContent = ({node}:{node: Node<NodeData>}) => {
    return (
        <div style={{marginBottom:'10px'}}>
            <input type={'number'} />
        </div>
    );
}

const Content= ({node}:{node: Node<NodeData>}) => {
    if(node.data?.constantValueType === "timespan") return <TimeSpanConstantValueContent node={node} />
    if(node.data?.constantValueType === "int32") return <Int32ConstantValueContent node={node} />
    return <p>TYPE NOT AVAILABLE</p>
}

const ConstantValueNode = (node: Node<NodeData>) =>{
    const data = node.data;
    return(
        <>
            <NodeTitle label={data?.label??''} />
            <Content node={node!}/>
            <Handle key={"value"} id={"value"} type={'source'} position={Position.Right} />
        </>
    );
}

export default ConstantValueNode;