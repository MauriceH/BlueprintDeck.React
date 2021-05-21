import {Elements} from "react-flow-renderer";
import {NodeData} from "../NodeData";
import {BluePrintDesign, DesignConnection, DesignConstantValue, DesignNode} from "../BluePrintDesign";
import {selectConnections, selectConstantValues, selectNodes} from "./elementSelectors";

export const createDesign = (elements: Elements<NodeData>) => {
    const newDesign: BluePrintDesign = {
        nodes: selectNodes(elements).map(n => {
            const result: DesignNode = {
                key: n.id,
                location: n.position,
                nodeTypeKey: n.data?.type!,
                title: n.data?.label!
            }
            return result;
        }),
        constantValues: selectConstantValues(elements).map(n => {
            const result: DesignConstantValue = {
                key: n.id,
                location: n.position,
                nodeTypeKey: n.data?.constantValueDataType!,
                title: n.data?.label!,
                value: n.data?.value!
            }
            return result;
        }),
        connections: selectConnections(elements).map(c => {
            const result: DesignConnection = {
                key: c.id,
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