import {RegistryNodePort} from "./BluePrintRegistry";
import {ReactNode} from "react";
import {Node} from "react-flow-renderer";

export type ConstantValueType = 'timespan' | 'int32'

export type BlueprintNodeData = Node<NodeData>;

export interface NodeData {
    label: string,
    type: string,
    constantValueDataType?: ConstantValueType,
    ports?: RegistryNodePort[],
    nodeType?: (node: Node<NodeData>) => ReactNode,
}