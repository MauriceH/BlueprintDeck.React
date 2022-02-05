import React from "react";
import {NodeArea, NodeAreaOptions} from "./NodeArea/NodeArea";
import './BlueprintDeck.css';
import {RegistryContext} from "./NodeArea/RegistryContext";
import {NodeTypesContext} from "./NodeArea/NodeTypesContext";
import {defaultReactNodes} from "./nodes/defaults/defaultReactNodes";
import {BluePrintRegistry} from "./model/BluePrintRegistry";

export interface BlueprintDeckOptions extends NodeAreaOptions {

}

const addRegistryTypeReferences = (registry: BluePrintRegistry): BluePrintRegistry => {
    return {
        nodeTypes: registry.nodeTypes.map(nodeType => {
            return {
                ...nodeType, properties: nodeType.properties?.map(prop => {
                    return {...prop, dataType: registry.dataTypes.find(o => {
                            return o.id == prop.typeId;
                        })}
                })
            }
        }), dataTypes: registry.dataTypes
    }
}


export const BlueprintDeck = (options: BlueprintDeckOptions) => {
    const registry = addRegistryTypeReferences(options.registry);
    return (
        <div style={{width: '100%', height: '100%'}}>
            <RegistryContext.Provider value={registry}>
                <NodeTypesContext.Provider value={{...defaultReactNodes, ...options.nodeTypes}}>
                    <NodeArea {...options} registry={registry}/>
                </NodeTypesContext.Provider>
            </RegistryContext.Provider>
        </div>)
}