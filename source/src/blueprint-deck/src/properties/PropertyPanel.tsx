import React from "react";
import {MiniMap, useStoreState} from "react-flow-renderer";
import {SelectionPropertyContent} from "./SelectionPropertyContent";

export const PropertyPanel = ()=>{

    return  <div style={{
        zIndex: 5,
        display: 'flex',
        flexDirection: 'column',
        flex: '0 0 300px',
        borderLeft: 'solid 1px #777',
        backgroundColor: 'white',
        padding: '10px'
    }}>
        <div>[BluePrintTitle]</div>

        <div style={{flex:'1 1 auto', overflow: "auto", display: 'flex', flexDirection:'column', alignItems:"start"}}>
            <SelectionPropertyContent />
        </div>
        <div style={{alignSelf: "center", flex: '0 0 auto'}}>
            <MiniMap style={{position:'inherit'}}/>
        </div>
    </div>
}