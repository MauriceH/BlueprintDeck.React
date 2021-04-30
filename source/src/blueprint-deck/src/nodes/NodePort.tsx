import {Handle, Position} from "react-flow-renderer";
import React from "react";
import {PortInputOutputType, RegistryNodePort} from "../BluePrintRegistry";


export function NodePort(props: { port: RegistryNodePort }) {
    const isInput = props.port.inputOutputType == PortInputOutputType.Input;

    const handleType = isInput ? 'target' : 'source';
    const position = isInput ? Position.Left : Position.Right;

    return <Handle
        style={{position: "inherit"}}
        id={props.port.key}
        type={handleType}
        position={position}
        isConnectable={false}
    />;
}