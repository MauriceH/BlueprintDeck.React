import {BluePrintRegistry, PortDataMode, PortInputOutputType} from "../BluePrintRegistry";
import {BluePrintDesign, DesignConstantValue, DesignNode} from "../BluePrintDesign";
import {Elements} from "react-flow-renderer";
import {Edge, Node} from "react-flow-renderer/dist/types";
import {BlueprintNodeData, ConstantValueType, NodeData} from "../NodeData";
import React, {ReactNode} from "react";
import {connectionStyle} from "../defaultConnectionStyle";


export declare type NodeTypes = {
    [key: string]: (node: BlueprintNodeData) => ReactNode;
};


export const createNodeElement = (registry: BluePrintRegistry, node: DesignNode) => {
    const nodeType = registry.nodeTypes.find(x => x.key === node.nodeTypeKey)
    if (nodeType == null) return null;
    const nodeElement: Node<NodeData> = {
        id: node.key,
        type: node.nodeTypeKey,
        position: {x: node.location.x, y: node.location.y},
        data: {
            label: node.title,
            type: node.nodeTypeKey,
            ports: nodeType.ports.map(x => {
                const dataType = registry.dataTypes.find(d => d.id == x.typeId)
                return {...x, dataType}
            }),
        },
    };
    return nodeElement;
}

export const createConstantValueElement = (registry: BluePrintRegistry, value: DesignConstantValue) => {
    const valueRegistry = registry.constantValueNodeTypes.find(x => x.key === value.nodeTypeKey)
    if (valueRegistry == null) return null;
    const portRegistry = valueRegistry.port;
    const dataType = registry.dataTypes.find(d => d.id == portRegistry.typeId)

    const nodeElement: Node<NodeData> = {
        id: value.key,
        type: 'constantValueNode',
        position: {x: value.location.x, y: value.location.y},
        data: {
            label: value.title,
            type: "ConstantValue",
            constantValueDataType: value.nodeTypeKey as ConstantValueType,
            ports: [{
                key: portRegistry.key,
                typeId: portRegistry.typeId,
                dataMode: PortDataMode.WithData,
                inputOutputType: PortInputOutputType.Output,
                title: portRegistry.title,
                mandatory: false,
                dataType: dataType
            }],
        },
    };
    return nodeElement
}


export const createElements = (registry: BluePrintRegistry, design: BluePrintDesign): Elements<NodeData> => {
    if (design == null) return [];

    const nodeElements = design.nodes
        .map(node => createNodeElement(registry, node))
        .filter(x => x != null)
        .map(x => x as Node<NodeData>) as Elements<NodeData>;

    const valueElements = design.constantValues
        .map(value => createConstantValueElement(registry, value))
        .map(x => x as Node<NodeData>) as Elements<NodeData>;

    const connectionElements = design.connections.map(value => {
        const connectionElement: Edge<NodeData> = {
            id: value.key,
            type: 'connection',
            source: value.nodeFrom,
            sourceHandle: value.nodePortFrom,
            target: value.nodeTo,
            targetHandle: value.nodePortTo,
            animated: false,
            style: {...connectionStyle}
        };
        return connectionElement;
    }).map(x => x as Edge<NodeData>) as Elements<NodeData>;

    return [...nodeElements, ...valueElements, ...connectionElements];
};


