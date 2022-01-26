import React from "react";
import {NodeArea, NodeAreaOptions} from "./NodeArea/NodeArea";
import './BlueprintDeck.css';
import {RegistryContext} from "./NodeArea/RegistryContext";
import {NodeTypesContext} from "./NodeArea/NodeTypesContext";
import {defaultReactNodes} from "./nodes/defaults/defaultReactNodes";

export interface BlueprintDeckOptions extends NodeAreaOptions {

}


export const BlueprintDeck = (options: BlueprintDeckOptions) => {
    return (
        <div style={{width: '100%', height: '100%'}}>
            <RegistryContext.Provider value={options.registry}>
                <NodeTypesContext.Provider value={{...defaultReactNodes,...options.nodeTypes}}>
                    <NodeArea {...options}/>
                </NodeTypesContext.Provider>
            </RegistryContext.Provider>
        </div>)
}