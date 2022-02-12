import React from "react";
import {NodeArea, NodeAreaOptions} from "./NodeArea/NodeArea";
import './BlueprintDeck.css';
import {RegistryContext} from "./NodeArea/RegistryContext";
import {NodeTypesContext} from "./NodeArea/NodeTypesContext";
import {defaultReactNodes} from "./nodes/defaults/defaultReactNodes";
import {addRegistryTypeReferences, NodePropertyEditors, PropertyTypeEditors} from "./model/BluePrintRegistry";
import {
    NodePropertyEditorsContext,
    PropertyTypeEditorsContext
} from "./NodeArea/PropertyTypeEditorsContext";

export interface BlueprintDeckOptions extends NodeAreaOptions {
    propertyTypeEditors?: PropertyTypeEditors
    nodePropertyEditors?: NodePropertyEditors
}


export const BlueprintDeck = (options: BlueprintDeckOptions) => {
    const registry = addRegistryTypeReferences(options.registry);
    return (
        <div className={"blueprintDeck"}>
            <PropertyTypeEditorsContext.Provider value={options.propertyTypeEditors}>
                <NodePropertyEditorsContext.Provider value={options.nodePropertyEditors}>
                    <RegistryContext.Provider value={registry}>
                        <NodeTypesContext.Provider value={{...defaultReactNodes, ...options.nodeTypes}}>
                            <NodeArea  {...options} registry={registry}/>
                        </NodeTypesContext.Provider>
                    </RegistryContext.Provider>
                </NodePropertyEditorsContext.Provider>
            </PropertyTypeEditorsContext.Provider>
        </div>)
}