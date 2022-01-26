import {RegistryNodePort} from "./BluePrintRegistry";
import {ReactNode} from "react";
import {Node, Edge} from "react-flow-renderer";

export type BlueprintNodeData = Node<NodeData>;

export type BlueprintEdgeData = Edge<NodeData>;

export interface NodeData {
    label: string,
    type: string,
    ports?: RegistryNodePort[],
    properties?: any,
    nodeType?: (node: Node<NodeData>) => ReactNode,
    value?: string,
}