import {Handle, Position} from "react-flow-renderer";
import React from "react";
import {PortInputOutputType, RegistryNodePort} from "../BluePrintRegistry";
import './NodePort.css'
import {HandleProps} from "react-flow-renderer/dist/types";
import {useCheckValidConnection} from "./useCheckValidConnection";

export type NodePortProps = {
    port: RegistryNodePort,
    typeVisible?: boolean
} & Partial<React.NamedExoticComponent<HandleProps & Omit<React.HTMLAttributes<HTMLDivElement>, "id">>>;

export function NodePort({typeVisible, port, ...props}: NodePortProps) {

    const checkConnection = useCheckValidConnection(port);

    const isInput = port.inputOutputType == PortInputOutputType.Input;
    const handleType = isInput ? 'target' : 'source';
    const position = isInput ? Position.Left : Position.Right;
    const containerCssName = port.inputOutputType == PortInputOutputType.Input ? 'left' : 'right'
    const typeTitle = port.dataType?.title ?? 'Action';
    const portTitle = port.title ?? 'Action';


    return <div>
        {typeVisible && <div className={"port-type-container port-type-container-" + containerCssName}>
          <div className={"port-type"}>{typeTitle}</div>
        </div>}
        <Handle
            style={{position: "inherit"}}
            id={port.key}
            {...props}
            type={handleType}
            position={position}
            isValidConnection={checkConnection}
        />
        <div className={"port-title-container port-title-container-" + containerCssName}>
            <div className={"port-title"}>{portTitle}</div>
        </div>
    </div>;
}