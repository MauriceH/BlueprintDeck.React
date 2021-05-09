import {BluePrintRegistry} from "./BluePrintRegistry";
import React from "react";


export const RegistryContext = React.createContext<BluePrintRegistry>({
    dataTypes: [],
    constantValueNodeTypes: [],
    nodeTypes: []
});