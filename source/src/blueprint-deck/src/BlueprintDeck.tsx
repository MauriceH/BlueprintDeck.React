import {NodeArea, NodeAreaOptions} from "./NodeArea";
import React, {useContext} from "react";
import './BlueprintDeck.css';
import {RegistryContext} from "./RegistryContext";

export interface BlueprintDeckOptions extends NodeAreaOptions {

}


export const BlueprintDeck = (options: BlueprintDeckOptions) => {
    return (
        <div style={{width: '100%', height: '100vh'}}>
            <RegistryContext.Provider value={options.registry}>
                <NodeArea {...options}/>
            </RegistryContext.Provider>
        </div>)
}