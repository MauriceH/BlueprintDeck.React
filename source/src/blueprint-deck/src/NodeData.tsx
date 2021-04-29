import {RegistryNodePort} from "./BluePrintRegistry";
import {ReactNode} from "react";
import {Node} from "react-flow-renderer";


export type NodeType = 'Activate' | 'Node' | 'ConstantValue'

export type ConstantValueType = 'timespan' | 'int32'

export interface NodeData {
    label: string,
    type: string,
    constantValueType?: ConstantValueType,
    ports?: RegistryNodePort[]
    nodeType?: (node: Node<NodeData>) =>ReactNode
}