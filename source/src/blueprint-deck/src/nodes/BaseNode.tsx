import React, {FC} from "react";
import {Handle, Node, Position} from "react-flow-renderer";
import {NodeData} from "../NodeData";
import {NodeTitle} from "./NodeTitle";
import {NodePort} from "./NodePort";
import {PortInputOutputType} from "../BluePrintRegistry";
import "./BaseNode.css";


export const BaseNode: FC<{ node: Node<NodeData> } & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement>> = (props) => {
    const {node, children, ...divProps} = props;

    const inputs = node.data?.ports
        ?.filter((x) => x.inputOutputType == PortInputOutputType.Input)
        .map(port => <NodePort key={port.key} port={port}/>);

    const outputs = node.data?.ports
        ?.filter((x) => x.inputOutputType == PortInputOutputType.Output)
        .map(port => <NodePort key={port.key} port={port}/>);

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
        </div>
    );
};
