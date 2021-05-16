import ReactFlow, {
    addEdge,
    Background,
    BackgroundVariant,
    Connection,
    Controls,
    Edge,
    Elements,
    OnLoadParams
} from "react-flow-renderer";
import React, {useCallback, useEffect, useRef, useState} from "react";
import {BluePrintRegistry} from "./BluePrintRegistry";
import {BluePrintDesign, DesignConstantValue, DesignNode} from "./BluePrintDesign";
import {createConstantValueElement, createElements, createNodeElement, NodeTypes} from "./nodes/createElements";
import {BlueprintNodeData, NodeData} from "./NodeData";
import {defaultReactNodes} from "./nodes/defaults/defaultReactNodes";
import {v4 as uuid} from "uuid"
import {connectionStyle} from "./defaultConnectionStyle";
import {SidePanel} from "./side-panel/SidePanel";
import {ReactFlowRefType} from "react-flow-renderer/dist/container/ReactFlow";
import {Node} from "react-flow-renderer/dist/types";
import {getDragData} from "./side-panel/node-pool/SetDragData";

export interface NodeAreaOptions {
    registry: BluePrintRegistry
    design?: BluePrintDesign
    nodeTypes: NodeTypes
}


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

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const reactFlowWrapper = useRef<ReactFlowRefType>(null);
    const [reactFlowInstance, setReactFlowInstance] = useState<OnLoadParams|null>(null);

    const onLoad = useCallback((instance: OnLoadParams) => {
        instance.fitView();
        setReactFlowInstance(instance);
    }, [setReactFlowInstance]);



    const onDrop = useCallback((event) => {
        event.preventDefault();
        if (reactFlowWrapper.current == null || reactFlowInstance == null) return;
        const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
        const data = getDragData(event.dataTransfer);
        if(data.type == null || data.title == null || data.nodeType == null) return;

        const position = reactFlowInstance.project({
            x: event.clientX - reactFlowBounds.left - 100,
            y: event.clientY - reactFlowBounds.top - 15,
        });

        if(data.type == 'node') {

            const newNode : DesignNode = {
                key: uuid(),
                nodeTypeKey: data.nodeType,
                title: data.title,
                location: position
            }
            const newElement = createNodeElement(registry, newNode);
            setElements((es) => es.concat(newElement as Node<NodeData>));
        } else {
            const newValue : DesignConstantValue = {
                key: uuid(),
                nodeTypeKey: data.nodeType,
                title: data.title,
                location: position,
                value: ''
            }
            const newElement = createConstantValueElement(registry, newValue);
            setElements((es) => es.concat(newElement as Node<NodeData>));
        }

    }, [reactFlowInstance, reactFlowWrapper, registry]);

    return <div style={{width: '100%', height: '100%', display: 'flex'}}>
        <ReactFlow
            ref={reactFlowWrapper}
            onLoad={onLoad}
            elements={elements}
            nodesConnectable={isConnectable}
            nodeTypes={{...defaultReactNodes, ...nodeTypes}}
            onConnect={onConnect}
            connectionLineStyle={{...connectionStyle}}
            snapGrid={[10, 10]}
            snapToGrid={true}
            elementsSelectable={true}
            onDragOver={onDragOver}
            onDrop={onDrop}
            style={{display: 'flex'}}
        >
            <Background variant={BackgroundVariant.Dots} gap={10}/>
            <Controls/>
            <SidePanel/>
        </ReactFlow>

    </div>;
};