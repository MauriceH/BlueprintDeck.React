import React, {FC} from "react";
import {BlueprintNodeData, NodeData} from "../NodeData";
import {NodeTitle} from "./NodeTitle";
import {NodePort} from "./NodePort";
import {PortInputOutputType} from "../BluePrintRegistry";
import "./BaseNode.css";
import {useStoreState, Edge} from "react-flow-renderer";
import {ElementId} from "react-flow-renderer/dist/types";


export type BaseNodeProps =
    { node: BlueprintNodeData }
    & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement>


export const BaseNode: FC<BaseNodeProps> = ({node, children, ...divProps}) => {

    const selectedElements = useStoreState((store) => store.selectedElements);
    const openConnection = useStoreState(store => {
        return {handleId: store.connectionHandleId, handleType: store.connectionHandleType, nodeId: store.connectionNodeId}
    });
    const nodes = useStoreState(store => store.nodes);
    const edges = useStoreState(store => store.edges);


    const connectingNode = nodes.find(x=>x.id == openConnection?.nodeId) as BlueprintNodeData;
    const connectingPort = connectingNode?.data?.ports?.find(x=>x.key == openConnection.handleId)
    const inputEdges = edges.filter(x=>x.target == node.id)
    const outputEdges = edges.filter(x=>x.source == node.id)


    const typeVisible = selectedElements?.find(x=>x.id == node.id) != null;

    const inputs = node.data?.ports
        ?.filter((x) => x.inputOutputType == PortInputOutputType.Input)
        .map(port => {
            const nodeTypeVisible = typeVisible || selectedElements?.find(x => (x as Edge<NodeData>).target == node.id && (x as Edge<NodeData>).targetHandle == port.key) != null
            const alreadyConnected = inputEdges.find(x=>x.targetHandle == port.key) != null
            const displayType = connectingPort == null ? 'default' : (openConnection.handleType != "source" || connectingPort.typeId != port.typeId || alreadyConnected)  ? 'unConnectable' : 'suggestion';

            return <NodePort key={port.key}
                             port={port}
                             typeVisible={nodeTypeVisible}
                             displayType={displayType}
                             isConnectable={!alreadyConnected}
            />;
        });

    const outputs = node.data?.ports
        ?.filter((x) => x.inputOutputType == PortInputOutputType.Output)
        .map(port => {
            const nodeTypeVisible = typeVisible || selectedElements?.find(x => (x as Edge<NodeData>).source == node.id && (x as Edge<NodeData>).sourceHandle == port.key) != null
            const alreadyConnected = outputEdges.find(x=>x.sourceHandle == port.key) != null
            const displayType = connectingPort == null ? 'default' : (openConnection.handleType != "target" || connectingPort.typeId != port.typeId || alreadyConnected)  ? 'unConnectable' : 'suggestion';

            return <NodePort key={port.key}
                             port={port}
                             typeVisible={nodeTypeVisible}
                             displayType={displayType}
                             isConnectable={!alreadyConnected}
            />;
        });

    return (
        <div {...divProps} className={"baseNode"}>
            <div className={"portContainer leftPortContainer"}>
                {inputs}
            </div>
            <div className={"contentContainer"}>
                <NodeTitle label={node.data?.label ?? "Node"}/>
                {children}
            </div>
            <div className={"portContainer rightPortContainer"}>
                {outputs}
            </div>
            <div className={"node-type-container"}>{node.data?.type}</div>
        </div>
    );
};
