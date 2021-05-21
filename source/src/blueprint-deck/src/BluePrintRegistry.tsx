import {BluePrintDesign} from "./BluePrintDesign";

interface RegistryPortBase {
    key: string;
    title: string;
    typeId?: string;
    defaultValue?: string
}

export interface RegistryNodePort extends RegistryPortBase {
    mandatory: boolean;
    inputOutputType: PortInputOutputType;
    dataMode: PortDataMode;
    dataType?: RegistryDataType
}

export enum PortInputOutputType {
    Input=0,
    Output=1
}

export enum PortDataMode {
    None=0,
    WithData=1
}


export interface RegistryNodeType {
    key: string;
    title: string;
    ports: RegistryNodePort[];
}

interface RegistryDataType {
    id: string;
    typeName: string;
    title: string;
}

export interface RegistryConstantValueType {
    key: string;
    title: string;
    port: RegistryPortBase;
}

export interface BluePrintRegistry {
    nodeTypes: RegistryNodeType[ ],
    dataTypes: RegistryDataType[ ],
    constantValueNodeTypes: RegistryConstantValueType[]
}

export const emptyDesign: BluePrintDesign= {connections: [], nodes: [], constantValues: []};