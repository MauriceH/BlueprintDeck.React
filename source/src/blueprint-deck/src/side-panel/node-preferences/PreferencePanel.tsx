import {Elements, MiniMap} from "react-flow-renderer";
import React from "react";
import {PropertyContainer} from "./PreferenceContainer/PropertyContainer";
import './PreferencePanel.css'
import {NodeData} from "../../model/NodeData";

export const PreferencePanel = ({elements}:{elements: Elements<NodeData>}) => {

    return <div className="node-preference-panel">
        <label className="node-preference-panel-header">Preferences</label>
        <PropertyContainer elements={elements}/>
        <div className="blueprint-minimap-container">
            <MiniMap className="blueprint-minimap"/>
        </div>
    </div>
}