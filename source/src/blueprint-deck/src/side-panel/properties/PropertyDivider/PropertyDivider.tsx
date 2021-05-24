import React, {EventHandler, MouseEvent, useCallback, useContext, useState} from "react";
import './PropertyDivider.css'
import {PropertyContainerDividerContext} from "../PropertyContainer/PropertyContainer";


export interface dividerProps {
    onMove: (xMovement:number) => void;
}

export const PropertyDivider = () => {
    const contextData = useContext(PropertyContainerDividerContext);


    const onMouseMove = useCallback((event:  MouseEvent<any>)=> {
        if(event.buttons != 1 || event.movementX == 0) return;
        contextData.onMove(event.movementX)
    },[contextData])

    return <div className="blueprint-property-divider"
                onMouseMove={onMouseMove}
    >
        <div/>
    </div>;
}