interface Location {
    x: number;
    y: number;
}

export interface DesignNode {
    location: Location;
    title?: string;
    id: string;
    nodeTypeKey: string;
    properties?: DesignPropertyValues;
}

export declare type DesignPropertyValues = {
    [key: string]: any;
}



export interface DesignConnection {
    id: string;
    nodeFrom: string;
    nodePortFrom: string;
    nodeTo: string;
    nodePortTo: string;
}

export interface Blueprint {
    nodes: DesignNode[],
    connections: DesignConnection[]
}