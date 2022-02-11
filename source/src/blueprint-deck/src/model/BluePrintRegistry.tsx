import {Blueprint} from "./Blueprint";
import {FunctionComponent, ReactNode} from "react";
import {BlueprintNodeData} from "./NodeData";

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

export type PortDirection = 'Input' | 'Output'

export enum PortDataMode {
    None = 0,
    WithData = 1
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
    dataType?: RegistryDataType
}

export interface RegistryDataType {
    id: string;
    typeName: string;
    title: string;
}

export interface BluePrintRegistry {
    nodeTypes: RegistryNode[ ],
    dataTypes: RegistryDataType[ ],
}

export const emptyDesign: Blueprint = {connections: [], nodes: []};


export interface PropertyEditorPropTypes {
    node: BlueprintNodeData,
    property: RegistryProperty
}

export interface PropertyTypeEditors {
    [key: string]: FunctionComponent<PropertyEditorPropTypes>;
}
export interface NodePropertyEditors {
    [key: string]: FunctionComponent<PropertyEditorPropTypes>;
}

export const addRegistryTypeReferences = (registry: BluePrintRegistry): BluePrintRegistry => {
    return {
        nodeTypes: registry.nodeTypes.map(nodeType => {
            return {
                ...nodeType, properties: nodeType.properties?.map(prop => {
                    return {
                        ...prop, dataType: registry.dataTypes.find(o => {
                            return o.id == prop.typeId;
                        })
                    }
                })
            }
        }), dataTypes: registry.dataTypes
    }
}