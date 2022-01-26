import {Blueprint} from "./Blueprint";

interface RegistryPortBase {
    key: string;
    title?: string;
    typeId?: string;
    defaultValue?: string
}

export interface RegistryNodePort extends RegistryPortBase {
    mandatory: boolean;
    direction: PortDirection;
    dataMode: PortDataMode;
    dataType?: RegistryDataType
}

export type PortDirection  = 'Input' | 'Output'

export enum PortDataMode {
    None=0,
    WithData=1
}


export interface RegistryNode {
    id: string;
    title: string;
    ports: RegistryNodePort[];
    properties: RegistryProperty[]
}

export interface RegistryProperty {
    typeId: string;
    name: string;
}

interface RegistryDataType {
    id: string;
    typeName: string;
    title: string;
}

export interface BluePrintRegistry {
    nodeTypes: RegistryNode[ ],
    dataTypes: RegistryDataType[ ],
}

export const emptyDesign: Blueprint= {connections: [], nodes: []};