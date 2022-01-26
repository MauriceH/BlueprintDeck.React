import {Handle, Position} from "react-flow-renderer";
import React from "react";
import {RegistryNodePort} from "../../../model/BluePrintRegistry";
import './NodePort.css'
import './NodePortAnimation.css'
import {HandleProps} from "react-flow-renderer/dist/types";
import {useCheckValidConnection} from "../../useCheckValidConnection";

export type NodePortProps = {
    port: RegistryNodePort,
    typeVisible?: boolean,
    displayType?: 'default' | 'suggestion' | 'unConnectable'
    isConnectable?: boolean
} & Partial<React.NamedExoticComponent<HandleProps & Omit<React.HTMLAttributes<HTMLDivElement>, "id">>>;

export function NodePort({typeVisible, port, displayType, isConnectable, ...props}: NodePortProps) {

    const checkConnection = useCheckValidConnection(port);

    const isInput = port.direction == 'Input';
    const handleType = isInput ? 'target' : 'source';
    const position = isInput ? Position.Left : Position.Right;
    const containerCssName = port.direction =='Input' ? 'left' : 'right'
    const typeTitle = port.dataType?.title ?? 'Action';
    const portTitle = port.title ?? port.key ?? 'Action';

    const handleClassName = displayType == "suggestion" ? 'port-suggestion' : displayType == "unConnectable" ? 'port-unconnectable' : '';

    return (
        <div>
            {typeVisible && <div className={"port-type-container port-type-container-" + containerCssName}>
              <div className={"port-type"}>{typeTitle}</div>
            </div>}
            <Handle className={handleClassName}
                    style={{position: "inherit"}}
                    id={port.key}
                    {...props}
                    type={handleType}
                    position={position}
                    isValidConnection={checkConnection}
                    isConnectable={isConnectable}
            />
            <div className={"port-title-container port-title-container-" + containerCssName}>
                <div className={"port-title"}>{portTitle}</div>
            </div>
        </div>);
}