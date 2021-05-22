import {BluePrintRegistry} from "../model/BluePrintRegistry";
import React, {useCallback, useContext} from "react";
import {BlueprintNodeData} from "../model/NodeData";


export const RegistryContext = React.createContext<BluePrintRegistry>({
    dataTypes: [],
    constantValueNodeTypes: [],
    nodeTypes: []
});

