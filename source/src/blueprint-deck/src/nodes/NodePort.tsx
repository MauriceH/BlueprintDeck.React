import {Handle, Position} from "react-flow-renderer";
import React, {useCallback} from "react";
import {PortInputOutputType, RegistryNodePort} from "../BluePrintRegistry";
import {Connection} from "react-flow-renderer/dist/types";


export type NodePortProps = {
    port: RegistryNodePort,
    isValidConnection?: (port: RegistryNodePort, connection: Connection) => boolean;
};

export function NodePort(props: NodePortProps) {
    const {port, isValidConnection} = props;
    const isInput = props.port.inputOutputType == PortInputOutputType.Input;

    const handleType = isInput ? 'target' : 'source';
    const position = isInput ? Position.Left : Position.Right;

    const isConnectable = useCallback((connection:Connection) => {
        if(isValidConnection == null) return true;
        return isValidConnection(port,connection);
    },[port, isValidConnection]);

    return <Handle
        style={{position: "inherit"}}
        id={props.port.key}
        {...props}
        type={handleType}
        position={position}
        isValidConnection={isConnectable}
    />;
}