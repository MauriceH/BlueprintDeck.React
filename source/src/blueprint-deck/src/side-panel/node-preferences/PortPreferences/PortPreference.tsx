import {LabeledComponent} from "../../../shared/components/LabeledComponent/LabeledComponent";
import React from "react";
import {PortDirection, RegistryNodePort} from "../../../model/BluePrintRegistry";
import {BlueprintNodeData} from "../../../model/NodeData";
import './PortPreference.css'

export interface InputPortPreferenceProps {
    direction: PortDirection
    thisNode: BlueprintNodeData
    thisPort: RegistryNodePort
    connectedNode?: BlueprintNodeData
    connectedPort?: RegistryNodePort
    onHoverChange?: (hover: boolean) => any;
}

export const PortPreference = (props: InputPortPreferenceProps) => {
    const {thisPort, connectedNode, connectedPort} = props;

    const onHover = (hover: boolean) => {
        if (props.onHoverChange != null) {
            props.onHoverChange(hover);
        }
    }

    let state = <div className={"port-preference port-preference-unconnected"} onMouseEnter={() => onHover(true)}
                     onMouseLeave={() => onHover(false)}>- not connected -</div>

    if (connectedNode != null && connectedPort != null) {
        state = <div
            className={"port-preference port-preference-connected-container"} onMouseEnter={() => onHover(true)}
            onMouseLeave={() => onHover(false)}>{connectedNode.data?.label}.{connectedPort?.title ?? connectedPort?.key ?? 'Not connected'}</div>
    }

    return (
        <LabeledComponent label={thisPort.title ?? thisPort.key}>
            {state}
        </LabeledComponent>
    )
}