import React, {EventHandler, MouseEvent, useCallback, useContext, useEffect, useState} from "react";
import './PropertyDivider.css'
import {PropertyContainerDividerContext} from "../PropertyContainer/PropertyContainer";
import {Simulate} from "react-dom/test-utils";
import drag = Simulate.drag;


export const PropertyDivider = () => {
    const contextData = useContext(PropertyContainerDividerContext);

    const [dragState, setDragState] = useState<{dragging:boolean, x: number}>({dragging:false, x:0})

    const onMouseDown = useCallback((e:MouseEvent<any>)=>{
        if(e.buttons != 1) return;
        setDragState({dragging:true, x: e.clientX});
    },[])

    const onMouseMove = useCallback((e:  MouseEvent<any>)=> {
        if(!dragState.dragging) return;
        const clientX = e.clientX;
        contextData.onMove(clientX - dragState.x)
        setDragState({dragging:true, x:clientX})
    },[dragState])

    const onMouseUp = useCallback((e:MouseEvent<any>)=>{
        setDragState({dragging:false, x: e.clientX});
        console.log('onMouseUp')
    },[])

    const onMouseLeave = useCallback((e:MouseEvent<any>)=> {
        setDragState({dragging:false, x:0})
    },[])

    useEffect(()=>{
        console.log('rerender')
    },[])

    return <div className="blueprint-property-divider"
                onDragStart={(event) => {
                    event.preventDefault();
                  event.stopPropagation()}}
                onMouseDown={onMouseDown}
                onMouseMove={onMouseMove}
                onMouseUp={onMouseUp}
                onMouseLeave={onMouseLeave}
    >
        <div
             onDragStart={(event) => event.preventDefault()}
        />
    </div>;
}