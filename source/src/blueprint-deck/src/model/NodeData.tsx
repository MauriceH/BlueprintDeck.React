import {RegistryNode, RegistryNodePort} from "./BluePrintRegistry";
import {ReactNode} from "react";
import {Node, Edge} from "react-flow-renderer";
import {DesignPropertyValues} from "./Blueprint";

export type BlueprintNodeData = Node<NodeData>;

export type BlueprintEdgeData = Edge<NodeData>;

export interface NodeData {
    label: string,
    type: string,
    ports?: RegistryNodePort[],
    properties?: DesignPropertyValues,
    nodeType?: (node: Node<NodeData>) => ReactNode,
    value?: string,
    registryNode: RegistryNode
}