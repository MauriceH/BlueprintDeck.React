import {BluePrintRegistry, PortDataMode, PortInputOutputType} from "../BluePrintRegistry";
import {BluePrintDesign} from "../BluePrintDesign";
import {Elements} from "react-flow-renderer";
import {Edge, Node} from "react-flow-renderer/dist/types";
import {BlueprintNodeData, ConstantValueType, IsValidNodeConnection, NodeData} from "../NodeData";
import React, {ReactNode} from "react";


export declare type NodeTypes = {
    [key: string]: (node: BlueprintNodeData) => ReactNode;
};


export const createElements = (registry: BluePrintRegistry, design: BluePrintDesign, isValidConnection: IsValidNodeConnection): Elements<NodeData> => {
    if (design == null) return [];

    const nodeElements = design.nodes.map(node => {
        const nodeType = registry.nodeTypes.find(x => x.key === node.nodeTypeKey)
        if (nodeType == null) return null;
        const nodeElement: Node<NodeData> = {
            id: node.key,
            type: node.nodeTypeKey,
            position: {x: node.location.x, y: node.location.y},
            data: {
                label: node.title,
                type: node.nodeTypeKey,
                ports: nodeType.ports,
                isValidConnection
            },
        };
        return nodeElement;
    }).filter(x => x != null).map(x => x as Node<NodeData>) as Elements<NodeData>;

    const valueElements = design.constantValues.map(value => {
        const valueRegistry = registry.constantValueNodeTypes.find(x => x.key === value.nodeTypeKey)
        if (valueRegistry == null) return null;
        const portRegistry = valueRegistry.port;
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
                    mandatory: false
                }],
                isValidConnection
            },
        };
        return nodeElement
    }).map(x => x as Node<NodeData>) as Elements<NodeData>;

    const connectionElements = design.connections.map(value => {
        const connectionElement: Edge<NodeData> = {
            id: value.key,
            source: value.nodeFrom,
            sourceHandle: value.nodePortFrom,
            target: value.nodeTo,
            targetHandle: value.nodePortTo,
        };
        return connectionElement;
    }).map(x => x as Edge<NodeData>) as Elements<NodeData>;

    return [...nodeElements, ...valueElements, ...connectionElements];
};


