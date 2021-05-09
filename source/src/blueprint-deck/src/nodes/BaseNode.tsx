import React, {FC} from "react";
import {BlueprintNodeData, NodeData} from "../NodeData";
import {NodeTitle} from "./NodeTitle";
import {NodePort} from "./NodePort";
import {PortInputOutputType} from "../BluePrintRegistry";
import "./BaseNode.css";
import {useStoreState, Edge} from "react-flow-renderer";


export type BaseNodeProps =
    { node: BlueprintNodeData }
    & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement>


export const BaseNode: FC<BaseNodeProps> = ({node, children, ...divProps}) => {

    const selectedElements = useStoreState((store) => store.selectedElements);

    const typeVisible = selectedElements?.find(x=>x.id == node.id) != null;

    const inputs = node.data?.ports
        ?.filter((x) => x.inputOutputType == PortInputOutputType.Input)
        .map(port => {
            const nodeTypeVisible = typeVisible || selectedElements?.find(x => (x as Edge<NodeData>).target == node.id && (x as Edge<NodeData>).targetHandle == port.key) != null
            return <NodePort key={port.key}
                             port={port}
                             typeVisible={nodeTypeVisible}/>;
        });

    const outputs = node.data?.ports
        ?.filter((x) => x.inputOutputType == PortInputOutputType.Output)
        .map(port => {
            const nodeTypeVisible = typeVisible || selectedElements?.find(x => (x as Edge<NodeData>).source == node.id && (x as Edge<NodeData>).sourceHandle == port.key) != null
            return <NodePort key={port.key}
                             port={port}
                             typeVisible={nodeTypeVisible}/>;
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
