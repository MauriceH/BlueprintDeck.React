import React, {useCallback, useState} from "react";
import {MiniMap} from "react-flow-renderer";
import {TabHeader} from "../TabHeader/TabHeader";
import {NodePool} from "../../node-pool/NodePool";
import {PropertyContainer} from "../../properties/PropertyContainer/PropertyContainer";
import {TabHeaderContainer} from "../TabHeaderContainer/TabHeaderContainer";
import './SidePanel.css'

enum SidePaneTab {
    properties = 'properties',
    nodePool = 'nodePool',
}

export const SidePanel = () => {

    const [activateTab, setActiveTab] = useState<SidePaneTab>(SidePaneTab.properties)

    const headerClick = useCallback((tab: SidePaneTab) => {
        setActiveTab(tab);
    }, [setActiveTab])

    return <div className="blueprint-side-panel">

        <TabHeaderContainer>
            <TabHeader title={'Properties'} active={activateTab == SidePaneTab.properties}
                       onClick={() => headerClick(SidePaneTab.properties)}/>
            <div style={{width: '1px', height: '80%', backgroundColor: '#eee', alignSelf: 'center'}}/>
            <TabHeader title={'Nodepool'} active={activateTab == SidePaneTab.nodePool}
                       onClick={() => headerClick(SidePaneTab.nodePool)}/>
        </TabHeaderContainer>
        {(activateTab == SidePaneTab.properties) && <PropertyContainer/>}
        {(activateTab == SidePaneTab.nodePool) && <NodePool/>}
        <div className="blueprint-minimap-container">
            <MiniMap className="blueprint-minimap"/>
        </div>
    </div>
}