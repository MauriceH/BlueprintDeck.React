import {BluePrintRegistry} from "../model/BluePrintRegistry";
import React from "react";


export const RegistryContext = React.createContext<BluePrintRegistry>({
    dataTypes: [],
    nodeTypes: []
});

