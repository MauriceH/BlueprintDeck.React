import ReactFlow, {
    addEdge,
    Background,
    BackgroundVariant,
    Connection,
    Controls,
    Edge,
    Elements,
    isEdge,
    isNode,
    OnLoadParams, useStoreState
} from "react-flow-renderer";
import React, {MouseEvent, useCallback, useRef, useState} from "react";
import {BluePrintRegistry, emptyDesign} from "../model/BluePrintRegistry";
import {BluePrintDesign} from "../model/BluePrintDesign";
import {createElements, NodeTypes} from "../nodes/createElements";
import {NodeData} from "../model/NodeData";
import {defaultReactNodes} from "../nodes/defaults/defaultReactNodes";
import {v4 as uuid} from "uuid"
import {connectionStyle} from "./defaultConnectionStyle";
import {SidePanel} from "../side-panel/SidePanel";
import {ReactFlowRefType} from "react-flow-renderer/dist/container/ReactFlow";
import {useNodeAreaDragDrop} from "./useNodeAreaDragDrop";
import {useNodeAreaBlueprintDesign} from "./useNodeAreaBlueprintDesign";
import {Node} from "react-flow-renderer/dist/types";
import {NodeEvents, NodeEventsContext} from "./NodeEventsContext";
import {KeyHandler} from "./KeyHandler";

export interface NodeAreaOptions {
    registry: BluePrintRegistry
    design?: BluePrintDesign
    nodeTypes: NodeTypes
    onDesignChanged?: (design: BluePrintDesign) => void;
}


export const NodeArea = ({registry, design, nodeTypes, onDesignChanged}: NodeAreaOptions) => {


    const [elements, setElements] = useState<Elements<NodeData>>(() => createElements(registry, design ?? emptyDesign));
    const [isConnectable, setConnectable] = useState(true);

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

    useNodeAreaBlueprintDesign(design, registry, setElements, elements, onDesignChanged);



    const reactFlowWrapper = useRef<ReactFlowRefType>(null);
    const [reactFlowInstance, setReactFlowInstance] = useState<OnLoadParams | null>(null);

    const onLoad = useCallback((instance: OnLoadParams) => {
        instance.fitView();
        setReactFlowInstance(instance);
    }, [setReactFlowInstance]);


    const {onDragOver, onDrop} = useNodeAreaDragDrop(reactFlowWrapper, reactFlowInstance, registry, setElements);


    const onNodesChanged = useCallback((event: MouseEvent, node: Node) => {
        setElements(oldElements => oldElements.map(x => x.id != node.id ? x : {...x, position: node.position}));
    }, [])


    const nodeEvents: NodeEvents = {
        onNodeDelete: (node) => {
            setElements(oldElements => {
                return oldElements.filter(x => (isNode(x) && x.id != node.id) || (isEdge(x) && x.source != node.id && x.target != node.id));
            });
        }
    };


    return <div style={{width: '100%', height: '100%', display: 'flex'}}>
        <NodeEventsContext.Provider value={nodeEvents}>
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
                onNodeDragStop={onNodesChanged}
                style={{display: 'flex'}}

            >
                <KeyHandler />
                <Background variant={BackgroundVariant.Dots} gap={10}/>
                <Controls/>
                <SidePanel/>
            </ReactFlow>
        </NodeEventsContext.Provider>

    </div>;
};


