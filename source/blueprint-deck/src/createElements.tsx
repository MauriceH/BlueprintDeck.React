import {BluePrintRegistry} from "./BluePrintRegistry";
import {BluePrintDesign} from "./BluePrintDesign";
import {Elements, Handle, Position} from "react-flow-renderer";
import {Connection, Edge, Node, NodeTypesType} from "react-flow-renderer/dist/types";
import {ConstantValueType, NodeData} from "./NodeData";
import ConstantValueNode from "./nodes/ConstantValueNode";
import React, {ReactNode} from "react";
import ActivateNode from "./nodes/ActiveateNode";
import {BaseNode} from "./nodes/BaseNode";

const isValidConnection = (connection: Connection) => connection.target === '3';


export declare type NodeTypes = {
    [key: string]: (node: Node<NodeData>)=>ReactNode;
};

const CustomNode = ({id}: any) => (
    <>
        <Handle type="target" position={Position.Left} isValidConnection={isValidConnection}/>
        <div>Node {id} </div>
        <Handle type="source" position={Position.Right} isValidConnection={isValidConnection}/>
    </>
);

export const nodeTypes: NodeTypesType = {
    constantValueNode: ConstantValueNode,
    activateNode : ActivateNode,
    'Delay' : (node:Node<NodeData>) => <BaseNode node={node}>DELAY</BaseNode>
};



export const createElements = (registry: BluePrintRegistry, design?: BluePrintDesign ): Elements<NodeData> => {
    if (design == null) return [];

    const nodeElements: Elements<NodeData> = design.nodes.map(node => {

        const nodeType = registry.nodeTypes.find(x => x.key === node.nodeTypeKey)
        if (nodeType == null) return null;
        const nodeElement: Node<NodeData> = {
            id: node.key,
            type: node.nodeTypeKey === 'Activate' ? 'activateNode' : node.nodeTypeKey,
            position: {x: node.location.x, y: node.location.y},
            data: {

                label: node.title,
                type: node.nodeTypeKey,
                ports: nodeType.ports,
            },
            sourcePosition: Position.Right
        };
        return nodeElement;
    }).filter(x => x != null).map(x => x as Node<NodeData>) as Elements<NodeData>;

    const valueElements: Elements<NodeData> = design.constantValues.map(value => {
        const nodeElement: Node<NodeData> = {
            id: value.key,
            position: {x: value.location.x, y: value.location.y},
            data: {
                label: value.title,
                type: "ConstantValue",
                constantValueType: value.nodeTypeKey as ConstantValueType
            },
            type: 'constantValueNode',
            sourcePosition: Position.Right
        };
        return nodeElement
    }).filter(x => x != null).map(x => x as Node<NodeData>) as Elements<NodeData>;

    const connectionElements: Elements<NodeData> = design.connections.map(value => {
        const connectionElement: Edge<NodeData> = {
            id: value.key,
            source: value.nodeFrom,
            sourceHandle: value.nodePortFrom,
            target: value.nodeTo,
            targetHandle: value.nodePortTo,
        };
        return connectionElement;
    }).filter(x => x != null).map(x => x as Edge<NodeData>) as Elements<NodeData>;

    return [...nodeElements, ...valueElements, ...connectionElements];
};


