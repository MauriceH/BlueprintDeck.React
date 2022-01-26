import {Elements} from "react-flow-renderer";
import {NodeData} from "../model/NodeData";
import {Blueprint, DesignConnection, DesignNode} from "../model/Blueprint";
import {selectConnections, selectNodes} from "./elementSelectors";

export const createBlueprintDesign = (elements: Elements<NodeData>) => {
    const newDesign: Blueprint = {
        nodes: selectNodes(elements).map(n => {
            const result: DesignNode = {
                id: n.id,
                location: {x: n.position?.x ?? 0, y: n.position?.y ?? 0},
                nodeTypeKey: n.data?.type!,
                title: n.data?.label!
            }
            return result;
        }),
        connections: selectConnections(elements).map(c => {
            const result: DesignConnection = {
                id: c.id,
                nodeFrom: c.source,
                nodePortFrom: c.sourceHandle!,
                nodeTo: c.target,
                nodePortTo: c.targetHandle!,
            }
            return result;
        })
    }
    return newDesign;
}