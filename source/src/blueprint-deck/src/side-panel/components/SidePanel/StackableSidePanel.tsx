import React, {PropsWithChildren} from "react";
import {MiniMap} from "react-flow-renderer";
import {PropertyContainer} from "../../properties/PropertyContainer/PropertyContainer";
import './SidePanel.css'

enum SidePaneTab {
    properties = 'properties',
    nodePool = 'nodePool',
}

export const PreferencePanel = () => {

    return <div className="blueprint-side-panel2">
        <label style={{lineHeight: '40px', borderBottom: 'solid 1px'}}>Preferences</label>
        <PropertyContainer/>
        <div className="blueprint-minimap-container">
            <MiniMap className="blueprint-minimap"/>
        </div>
    </div>
}

export const StackableSidePanel = ({children}: PropsWithChildren<{}>) => {
    return <div className="blueprint-side-panel">
        {children}
    </div>
}