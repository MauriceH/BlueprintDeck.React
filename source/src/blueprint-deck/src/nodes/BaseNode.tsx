import React, {FC, useCallback} from "react";
import {BlueprintNodeData} from "../NodeData";
import {NodeTitle} from "./NodeTitle";
import {NodePort} from "./NodePort";
import {PortInputOutputType, RegistryNodePort} from "../BluePrintRegistry";
import "./BaseNode.css";
import {Connection} from "react-flow-renderer/dist/types";


export type BaseNodeProps =
    { node: BlueprintNodeData }
    & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement>


export const BaseNode: FC<BaseNodeProps> = ({node, children, ...divProps}) => {

    const isValidConnection = useCallback((port: RegistryNodePort, connection: Connection) => {
        if(node.data?.isValidConnection == null) return true;
        return node.data.isValidConnection(node,port,connection);
    }, [node]);

    const inputs = node.data?.ports
        ?.filter((x) => x.inputOutputType == PortInputOutputType.Input)
        .map(port => <NodePort key={port.key}
                               port={port}
                               isValidConnection={isValidConnection}/>);

    const outputs = node.data?.ports
        ?.filter((x) => x.inputOutputType == PortInputOutputType.Output)
        .map(port => <NodePort key={port.key}
                               port={port}
                               isValidConnection={isValidConnection}/>);

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
