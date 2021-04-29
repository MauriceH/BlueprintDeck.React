import {NodeArea, NodeAreaOptions} from "./NodeArea";
import React from "react";
import './BlueprintDeck.css';
import {NodeTypesType} from "react-flow-renderer/dist/types";

export interface BlueprintDeckOptions extends NodeAreaOptions {

}


export const BlueprintDeck = (options: BlueprintDeckOptions) => {
    return (
        <div style={{width: '100%', height: '100vh'}}>
            <NodeArea {...options}/>
        </div>)
}