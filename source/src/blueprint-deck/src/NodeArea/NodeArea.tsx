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
    OnLoadParams, useStoreActions
} from "react-flow-renderer";
import React, {MouseEvent, useCallback, useContext, useRef, useState} from "react";
import {
    BluePrintRegistry,
    emptyDesign,
    NodePropertyEditors,
    PropertyTypeEditors,
    RegistryNode
} from "../model/BluePrintRegistry";
import {Blueprint, DesignNode} from "../model/Blueprint";
import {createElements, createNodeElement} from "../nodes/createElements";
import {NodeData} from "../model/NodeData";
import {v4 as uuid} from "uuid"
import {connectionStyle} from "./defaultConnectionStyle";
import {StackableSidePanel} from "../side-panel/components/StackableSidePanel/StackableSidePanel";
import {ReactFlowRefType} from "react-flow-renderer/dist/container/ReactFlow";
import {useNodeAreaBlueprintDesign} from "./useNodeAreaBlueprintDesign";
import {Node, NodeTypesType} from "react-flow-renderer/dist/types";
import {NodeEvents, NodeEventsContext} from "./NodeEventsContext";
import {KeyHandler} from "./KeyHandler";
import {NodeTypesContext} from "./NodeTypesContext";
import {AddNodeButton} from "./AddNodeButton";
import {AddNodeDialog} from "./AddNodeDialog";
import {PreferencePanel} from "../side-panel/node-preferences/PreferencePanel";

export interface NodeAreaOptions {
    registry: BluePrintRegistry
    design?: Blueprint
    nodeTypes: NodeTypesType
    onDesignChanged?: (design: Blueprint) => void;
}


export const NodeArea = ({registry, design, nodeTypes, onDesignChanged}: NodeAreaOptions) => {

    const nodeTypesContext = useContext(NodeTypesContext);
    const [elements, setElements] = useState<Elements<NodeData>>(() => createElements(registry, design ?? emptyDesign, nodeTypesContext));
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



    const onNodesChanged = useCallback((event: MouseEvent, node: Node) => {
        setElements(oldElements => oldElements.map(x => x.id != node.id ? x : {...x, position: node.position}));
    }, [])


    const nodeEvents: NodeEvents = {
        onNodeDelete: (node) => {
            if(node?.id == null) return;
            setElements(oldElements => {
                return oldElements.filter(x => (isNode(x) && x.id != node.id) || (isEdge(x) && x.source != node.id && x.target != node.id));
            });
        }
    };

    const [addDialogVisible, setAddDialogVisible] = useState(false);
    const onShowAddDialog = useCallback(()=>{
        setAddDialogVisible(true)
    },[setAddDialogVisible])

    const onHideAddDialog = useCallback(()=>{
        setAddDialogVisible(false)
    },[setAddDialogVisible])

    const onAddNode = useCallback((node: RegistryNode)=>{
        const reactFlowBounds = reactFlowWrapper.current!.getBoundingClientRect();
        const position = reactFlowInstance!.project({
            x: (reactFlowBounds.width - 450) / 2 - 100 ,
            y: reactFlowBounds.height / 2 - 15,
        });
        const newNode: DesignNode = {
            id: uuid(),
            nodeTypeKey: node.id,
            title: node.title,
            location: position
        }
        const newNodeElement = createNodeElement(registry, newNode, nodeTypes)
        console.log('new-element', newNodeElement, newNode)
        setElements(els => els.concat(newNodeElement!))
        setAddDialogVisible(false)
    },[setAddDialogVisible, setElements, reactFlowWrapper, reactFlowInstance])

    return <div style={{width: '100%', height: '100%', display: 'flex'}}>
        {addDialogVisible && <AddNodeDialog onClose={onHideAddDialog} onAdd={onAddNode}/> }
        <NodeEventsContext.Provider value={nodeEvents}>
            <ReactFlow
                ref={reactFlowWrapper}
                onLoad={onLoad}
                elements={elements}
                nodesConnectable={isConnectable}
                nodeTypes={nodeTypesContext}
                onConnect={onConnect}
                connectionLineStyle={{...connectionStyle}}
                snapGrid={[10, 10]}
                snapToGrid={true}
                elementsSelectable={true}
                onNodeDragStop={onNodesChanged}
                style={{display: 'flex'}}

            >
                <KeyHandler />
                <Controls/>
                <Background variant={BackgroundVariant.Dots} gap={10}/>
                <StackableSidePanel>
                    <AddNodeButton onClick={onShowAddDialog}/>
                    <PreferencePanel />
                </StackableSidePanel>
            </ReactFlow>
        </NodeEventsContext.Provider>

    </div>;
};


