import {BlueprintEdgeData, BlueprintNodeData, NodeData} from "../model/NodeData";
import {Elements, isEdge, isNode} from "react-flow-renderer";

export const selectNodes = (elements:Elements<NodeData>) => {
    return elements.filter(x=> isNode(x))
        .map(x=> x as BlueprintNodeData);
}
export const selectConnections = (elements:Elements<NodeData>) => {
    return elements.filter(x=> isEdge(x))
        .map(x=> x as BlueprintEdgeData);
}