import React, {useCallback, useState} from "react";
import {MiniMap} from "react-flow-renderer";
import {TabHeader} from "./TabHeader";
import {NodePool} from "./node-pool/NodePool";
import {PropertyPane} from "./properties/PropertyPane";
import {ValuePool} from "./node-pool/ValuePool";

type sidePaneTab = 'properties' | 'nodepool' | 'valuepool'

export const SidePanel = () => {

    const [activateTab, setActiveTab] = useState<sidePaneTab>('properties')

    const headerClick = useCallback((tab: sidePaneTab) => {
        setActiveTab(tab);
    }, [setActiveTab])

    return <div style={{
        zIndex: 5,
        display: 'flex',
        flexDirection: 'column',
        flex: '0 0 300px',
        borderLeft: 'solid 1px #777',
        backgroundColor: 'white'
    }}>


        <div style={{
            display: 'flex',
            borderBottom: 'solid 1px #DDD',
            paddingTop: '2px',
            marginTop:'5px',
        }}>
            <TabHeader title={'Properties'} active={activateTab == 'properties'}
                       onClick={() => headerClick("properties")}/>
            <div style={{width: '1px', height: '80%', backgroundColor: '#eee', alignSelf: 'center'}}/>
            <TabHeader title={'Nodepool'} active={activateTab == 'nodepool'} onClick={() => headerClick("nodepool")}/>
            <div style={{width: '1px', height: '80%', backgroundColor: '#eee', alignSelf: 'center'}}/>
            <TabHeader title={'Valuepool'} active={activateTab == 'valuepool'} onClick={() => headerClick("valuepool")}/>
        </div>
        {(activateTab == "properties") && <PropertyPane />}
        {(activateTab == "nodepool") && <NodePool/>}
        {(activateTab == "valuepool") && <ValuePool/>}
        <div style={{alignSelf: "center", flex: '0 0 auto'}}>
            <MiniMap style={{position: 'inherit'}}/>
        </div>
    </div>
}