import React, {useCallback} from "react";
import {Connection, Edge, Node, useStoreState} from "react-flow-renderer";
import {PortDataMode, PortInputOutputType, RegistryNodePort} from "../BluePrintRegistry";
import {NodeData} from "../NodeData";

export const useCheckValidConnection = (port: RegistryNodePort) => {
    const nodes = useStoreState((store) => store.nodes);
    const edges = useStoreState((store) => store.edges);

    return useCallback((connection: Connection) => {

        const checkId = connection.sourceHandle == port.key ? connection.target : connection.source;
        const checkPortId = connection.sourceHandle == port.key ? connection.targetHandle : connection.sourceHandle;
        const checkPortDirection = port.inputOutputType == PortInputOutputType.Input ? PortInputOutputType.Output : PortInputOutputType.Input;

        const checkNode = nodes.find(e => e.id == checkId) as Node<NodeData>;
        if (checkNode?.data?.ports == null) return false;


        const checkPort = checkNode.data.ports.find(p => {
            return p.key == checkPortId && p.inputOutputType == checkPortDirection;
        });
        if (checkPort == null) return false;
        if (checkPort.dataMode != port.dataMode) return false;

        if(checkPort.inputOutputType == PortInputOutputType.Input) {
            if(edges.find(x=> x.target == checkNode.id && x.targetHandle == checkPort.key)) return false;
        } else {
            if(edges.find(x => x.source == checkNode.id && x.sourceHandle == checkPort.key)) return false;
        }

        if (port.dataMode == PortDataMode.None) return true;
        return port.typeId == checkPort.typeId;

    }, [nodes]);
}