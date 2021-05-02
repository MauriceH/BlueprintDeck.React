import React, {useCallback} from "react";
import {Connection, Elements, Node, Edge} from "react-flow-renderer";
import {BluePrintRegistry, PortDataMode, PortInputOutputType, RegistryNodePort} from "../BluePrintRegistry";
import {BlueprintNodeData, NodeData} from "../NodeData";

export function checkValidConnection(refElements: React.MutableRefObject<Elements>, registry: BluePrintRegistry) {
    return useCallback((node: BlueprintNodeData, port: RegistryNodePort, connection: Connection) => {

        const checkId = connection.source == node.id ? connection.target : connection.source;
        const checkPortId = connection.source == node.id ? connection.targetHandle : connection.sourceHandle;
        const checkPortDirection = port.inputOutputType == PortInputOutputType.Input ? PortInputOutputType.Output : PortInputOutputType.Input;

        const checkNode = refElements.current.find(e => e.id == checkId) as Node<NodeData>;
        if (checkNode?.data?.ports == null) return false;


        const checkPort = checkNode.data.ports.find(p => {
            return p.key == checkPortId && p.inputOutputType == checkPortDirection;
        });
        if (checkPort == null) return false;
        if (checkPort.dataMode != port.dataMode) return false;
        if(checkPort.inputOutputType == PortInputOutputType.Input) {
            if(refElements.current.find(x=> {
                let possibleEdge = x as Edge;
                return possibleEdge.target == checkNode.id && possibleEdge.targetHandle == checkPort.key;
            })) return false;
        } else {
            if(refElements.current.find(x=> {
                let possibleEdge = x as Edge;
                return possibleEdge.source == checkNode.id && possibleEdge.sourceHandle == checkPort.key;
            })) return false;
        }

        if (port.dataMode == PortDataMode.None) return true;
        if (port.typeId != checkPort.typeId) return false;
        return true;
    }, [refElements, registry]);
}