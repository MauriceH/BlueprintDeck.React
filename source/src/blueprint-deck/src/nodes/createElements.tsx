import {BluePrintRegistry} from "../model/BluePrintRegistry";
import {Blueprint, DesignNode} from "../model/Blueprint";
import {Elements} from "react-flow-renderer";
import {Edge, Node, NodeTypesType} from "react-flow-renderer/dist/types";
import {BlueprintNodeData, NodeData} from "../model/NodeData";
import React, {ReactNode} from "react";
import {connectionStyle} from "../NodeArea/defaultConnectionStyle";


export declare type NodeTypes = {
    [key: string]: (node: BlueprintNodeData) => ReactNode;
};

export const ConnectionElementType = 'connection'

export const createNodeElement = (registry: BluePrintRegistry, node: DesignNode, nodeTypes: NodeTypesType) => {
    const nodeType = registry.nodeTypes.find(x => x.id === node.nodeTypeKey)
    if (nodeType == null) return null;

    let nodeTypeName = 'Default'
    if(nodeTypes != null) {
        if(Object.keys( nodeTypes).filter(x=>x.toLocaleLowerCase() == node.nodeTypeKey.toLocaleLowerCase()).length > 0) {
            nodeTypeName = node.nodeTypeKey;
        }
    }


    const nodeElement: Node<NodeData> = {
        id: node.id,
        type: nodeTypeName,
        position: {x: node.location.x, y: node.location.y},
        data: {
            label: node.title ?? node.nodeTypeKey,
            type: node.nodeTypeKey,
            ports: nodeType.ports.map(x => {
                const dataType = registry.dataTypes.find(d => d.id == x.typeId)
                return {...x, dataType}
            }),
            properties: node.properties
        },
    };
    return nodeElement;
}


export const createElements = (registry: BluePrintRegistry, design: Blueprint, nodeTypes: NodeTypesType): Elements<NodeData> => {
    if (design == null) return [];

    const nodeElements = design.nodes
        .map(node => createNodeElement(registry, node, nodeTypes))
        .filter(x => x != null)
        .map(x => x as Node<NodeData>) as Elements<NodeData>;


    const connectionElements = design.connections.map(value => {
        const connectionElement: Edge<NodeData> = {
            id: value.id,
            type: ConnectionElementType,
            source: value.nodeFrom,
            sourceHandle: value.nodePortFrom,
            target: value.nodeTo,
            targetHandle: value.nodePortTo,
            animated: false,
            style: {...connectionStyle}
        };
        return connectionElement;
    }).map(x => x as Edge<NodeData>) as Elements<NodeData>;

    return [...nodeElements, ...connectionElements];
};


