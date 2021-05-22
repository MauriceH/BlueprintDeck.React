import React, {useCallback, useContext} from "react";
import {BlueprintNodeData} from "../model/NodeData";

export interface NodeEvents {
    onNodeDelete : (node: BlueprintNodeData)=> void;
}

export const NodeEventsContext = React.createContext<NodeEvents>({
    onNodeDelete: (node)=>{}
});

export const useNodeDelete = () => {
    const context = useContext(NodeEventsContext)
    const callback = useCallback((node: BlueprintNodeData)=>{
        context.onNodeDelete(node);
    },[context])
    return callback
}