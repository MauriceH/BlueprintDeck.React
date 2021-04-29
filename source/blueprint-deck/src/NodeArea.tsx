import ReactFlow, {addEdge, Background, BackgroundVariant, Controls, MiniMap} from "react-flow-renderer";
import React, {useState} from "react";
import {Connection, Edge, OnLoadParams} from "react-flow-renderer/dist/types";
import {BluePrintRegistry} from "./BluePrintRegistry";
import {BluePrintDesign} from "./BluePrintDesign";
import {createElements, NodeTypes, nodeTypes} from "./createElements";

export interface NodeAreaOptions {
    registry: BluePrintRegistry
    design?: BluePrintDesign
    nodeTypes: NodeTypes
}

const onLoad = (reactFlowInstance: OnLoadParams) => reactFlowInstance.fitView();




export const NodeArea = (options:NodeAreaOptions) => {
    const initialElements = createElements(options.registry, options.design);
    const [isConnectable, setConnectable] = useState(true);
    const [elements, setElements] = useState(initialElements);
    const onConnect = (connection: Edge | Connection) => setElements((els) => addEdge(connection, els));

    return <ReactFlow
        onLoad={onLoad}
        elements={elements}
        nodesConnectable={isConnectable}
        nodeTypes={{...nodeTypes, ...options.nodeTypes}}
        onConnect={onConnect}
        snapGrid={[20, 20]}
        snapToGrid={true}

    >
        <Background variant={BackgroundVariant.Lines} gap={20} />
        <MiniMap/>
        <Controls/>
    </ReactFlow>;
};