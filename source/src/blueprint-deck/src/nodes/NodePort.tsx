import {Connection, Handle, Position} from "react-flow-renderer";
import React, {useCallback} from "react";
import {PortInputOutputType, RegistryNodePort} from "../BluePrintRegistry";
import './NodePort.css'

export type NodePortProps = {
    port: RegistryNodePort,
    isValidConnection?: (port: RegistryNodePort, connection: Connection) => boolean;
    typeVisible?: boolean
};

export function NodePort(props: NodePortProps) {
    const {port, isValidConnection, typeVisible} = props;
    const isInput = props.port.inputOutputType == PortInputOutputType.Input;

    const handleType = isInput ? 'target' : 'source';
    const position = isInput ? Position.Left : Position.Right;

    const isConnectable = useCallback((connection: Connection) => {
        if (isValidConnection == null) return true;
        return isValidConnection(port, connection);
    }, [port, isValidConnection]);

    const containerCssName = props.port.inputOutputType == PortInputOutputType.Input ? 'left' : 'right'
    const typeTitle = props.port.dataType?.title ?? 'Action';

    return <div>
        {typeVisible && <div className={"port-type-container port-type-container-" + containerCssName}>
          <div className={"port-type"}>{typeTitle}</div>
        </div>}
        <Handle
            style={{position: "inherit"}}
            id={props.port.key}
            {...props}
            type={handleType}
            position={position}
            isValidConnection={isConnectable}
        />
    </div>;
}