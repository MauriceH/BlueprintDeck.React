import ReactFlow, {
    addEdge,
    Background,
    BackgroundVariant,
    Connection,
    Controls,
    Edge,
    Elements,
    MiniMap,
    Node,
    OnLoadParams
} from "react-flow-renderer";
import React, {useCallback, useEffect, useState} from "react";
import {BluePrintRegistry, PortDataMode, PortInputOutputType, RegistryNodePort} from "./BluePrintRegistry";
import {BluePrintDesign} from "./BluePrintDesign";
import {createElements, defaultReactNodes, NodeTypes} from "./createElements";
import {BlueprintNodeData, NodeData} from "./NodeData";

export interface NodeAreaOptions {
    registry: BluePrintRegistry
    design?: BluePrintDesign
    nodeTypes: NodeTypes
}

const onLoad = (reactFlowInstance: OnLoadParams) => reactFlowInstance.fitView();


export const NodeArea = ({registry, design, nodeTypes}: NodeAreaOptions) => {

    const [isConnectable, setConnectable] = useState(true);
    const [elements, setElements] = useState<Elements<NodeData>>([]);
    const onConnect = (connection: Edge | Connection) => setElements((els) => addEdge(connection, els));

    const refElements = React.useRef(elements);
    const isValidConnection = useCallback((node: BlueprintNodeData, port: RegistryNodePort, connection: Connection) => {

        const checkId = connection.source == node.id ? connection.target : connection.source;
        const checkPortId = connection.source == node.id ? connection.targetHandle : connection.targetHandle;
        const checkPortDirection = port.inputOutputType == PortInputOutputType.Input ? PortInputOutputType.Output : PortInputOutputType.Input;

        const checkNode = refElements.current.find(e => e.id == checkId) as Node<NodeData>;
        if (checkNode?.data?.ports == null) return false;


        const checkPort = checkNode.data.ports.find(p => p.key == checkPortId && p.inputOutputType == checkPortDirection);
        if (checkPort == null) return false;

        if (checkPort.dataMode != port.dataMode) return false;
        if (port.dataMode == PortDataMode.None) return true;

        if (checkPort.typeId != checkPort.typeId) return false;

        return true;
    }, [elements, registry]);

    useEffect(() => {
        let designData = design;
        if (designData == null) {
            designData = {constantValues: [], nodes: [], connections: []}
        }
        const initialElements = createElements(registry, designData, isValidConnection);
        setElements(initialElements)
    }, [setElements, registry, design])

    useEffect(()=>{
        refElements.current = elements;
    },[elements])

    return <ReactFlow
        onLoad={onLoad}
        elements={elements}
        nodesConnectable={isConnectable}
        nodeTypes={{...defaultReactNodes, ...nodeTypes}}
        onConnect={onConnect}
        snapGrid={[20, 20]}
        snapToGrid={true}

    >
        <Background variant={BackgroundVariant.Lines} gap={20}/>
        <MiniMap/>
        <Controls/>
    </ReactFlow>;
};