import {MiniMap} from "react-flow-renderer";
import React from "react";
import {PropertyContainer} from "./PropertyContainer/PropertyContainer";
import './PreferencePanel.css'

export const PreferencePanel = () => {

    return <div className="node-preference-panel">
        <label className="node-preference-panel-header">Preferences</label>
        <PropertyContainer/>
        <div className="blueprint-minimap-container">
            <MiniMap className="blueprint-minimap"/>
        </div>
    </div>
}