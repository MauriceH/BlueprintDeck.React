interface RegistryPortBase {
    key: string;
    title: string;
    typeId?: string;
    defaultValue?: string
}

export interface RegistryNodePort extends RegistryPortBase {
    mandatory: boolean;
    inputOutputType: number;
    dataMode: number;
}

interface RegistryNodeType {
    key: string;
    title: string;
    ports: RegistryNodePort[];
}

interface RegistryDataType {
    id: string;
    typeName: string;
    title: string;
}

interface RegistryConstantValueType {
    key: string;
    title: string;
    port: RegistryPortBase;
}

export interface BluePrintRegistry {
    nodeTypes: RegistryNodeType[ ],
    dataTypes: RegistryDataType[ ],
    constantValueNodeTypes: RegistryConstantValueType[]
}