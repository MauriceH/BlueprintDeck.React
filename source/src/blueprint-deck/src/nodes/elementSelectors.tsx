import {BlueprintEdgeData, BlueprintNodeData, NodeData} from "../model/NodeData";
import {Elements, isEdge} from "react-flow-renderer";
import {ConnectionElementType, ConstantValueElementType} from "./createElements";


export const selectNodes = (elements:Elements<NodeData>) => {
    return elements.filter(x=> (x as any).position != null && x.type != ConstantValueElementType)
        .map(x=> x as BlueprintNodeData);
}
export const selectConstantValues = (elements:Elements<NodeData>) => {
    return elements.filter(x=> (x as any).position != null && x.type == ConstantValueElementType)
        .map(x=> x as BlueprintNodeData);
}
export const selectConnections = (elements:Elements<NodeData>) => {
    return elements.filter(x=> isEdge(x))
        .map(x=> x as BlueprintEdgeData);
}