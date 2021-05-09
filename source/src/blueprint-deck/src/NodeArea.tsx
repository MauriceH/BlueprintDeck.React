import ReactFlow, {
    addEdge,
    Background,
    BackgroundVariant,
    Connection,
    Controls,
    Edge,
    Elements,
    MiniMap,
    OnLoadParams
} from "react-flow-renderer";
import React, {useEffect, useState} from "react";
import {BluePrintRegistry} from "./BluePrintRegistry";
import {BluePrintDesign} from "./BluePrintDesign";
import {createElements, NodeTypes} from "./nodes/createElements";
import {NodeData} from "./NodeData";
import {defaultReactNodes} from "./nodes/defaults/defaultReactNodes";
import {v4 as uuid} from "uuid"
import {connectionStyle} from "./defaultConnectionStyle";
import {PropertyPanel} from "./properties/PropertyPanel";

export interface NodeAreaOptions {
    registry: BluePrintRegistry
    design?: BluePrintDesign
    nodeTypes: NodeTypes
}

const onLoad = (reactFlowInstance: OnLoadParams) => reactFlowInstance.fitView();


export const NodeArea = ({registry, design, nodeTypes}: NodeAreaOptions) => {

    const [isConnectable, setConnectable] = useState(true);
    const [elements, setElements] = useState<Elements<NodeData>>([]);
    const onConnect = (connection: Edge | Connection) => {
        const edge: Edge<NodeData> = {
            id: uuid(),
            source: connection.source!,
            target: connection.target!,
            sourceHandle: connection.sourceHandle,
            targetHandle: connection.targetHandle,
            animated: false,
            style: {...connectionStyle}
        }
        setElements((els) => addEdge(edge, els));
    };


    useEffect(() => {
        let designData = design;
        if (designData == null) {
            designData = {constantValues: [], nodes: [], connections: []}
        }
        const initialElements = createElements(registry, designData);
        setElements(initialElements)
    }, [setElements, registry, design])


    return <div style={{width: '100%', height: '100%', display: 'flex'}}>
        <ReactFlow
            onLoad={onLoad}
            elements={elements}
            nodesConnectable={isConnectable}
            nodeTypes={{...defaultReactNodes, ...nodeTypes}}
            onConnect={onConnect}
            connectionLineStyle={{...connectionStyle}}
            snapGrid={[10, 10]}
            snapToGrid={true}
            elementsSelectable={true}
            style={{display: 'flex'}}
        >
            <Background variant={BackgroundVariant.Dots} gap={10}/>
            <Controls/>
            <PropertyPanel/>
        </ReactFlow>

    </div>;
};