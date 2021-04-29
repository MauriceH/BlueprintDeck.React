interface Location {
    x: number;
    y: number;
}

interface DesignNode {
    location: Location;
    title: string;
    key: string;
    nodeTypeKey: string;
    data?: any;
}

interface DesignConnection {
    key: string;
    nodeFrom: string;
    nodePortFrom: string;
    nodeTo: string;
    nodePortTo: string;
}

interface DesignConstantValue {
    location: Location;
    title: string;
    key: string;
    nodeTypeKey: string;
    data?: any;
    value: string;
}

export interface BluePrintDesign {
    nodes: DesignNode[],
    connections: DesignConnection[],
    constantValues: DesignConstantValue[]
}