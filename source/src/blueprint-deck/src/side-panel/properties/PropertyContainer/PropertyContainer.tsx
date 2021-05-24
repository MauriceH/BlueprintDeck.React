import React, {useState} from "react";
import {PropertyContent} from "../PropertyContent/PropertyContent";
import './PropertyContainer.css'

export interface dividerContextData {
    onMove: (xMovement: number) => void;
}

export const PropertyContainerDividerContext = React.createContext<dividerContextData>({
    onMove: () => {
    }
})

export const PropertyContainer = () => {

    const [propertyColumnWidth, setPropertyColumnWidth] = useState(150);

    const dividerContext : dividerContextData = {
        onMove: xMovement => {
            setPropertyColumnWidth(oldWidth => oldWidth + xMovement);
        }
    }

    const style = {gridTemplateColumns: '[property] ' + propertyColumnWidth + 'px [divider] 1px'}

    return <>
        <PropertyContainerDividerContext.Provider value={dividerContext}>
            <div ref={(instance)=>{}} className="blueprint-property-container" style={style}>
                <div className="blueprint-property-grid" style={style}>
                    <PropertyContent/>
                </div>
            </div>
        </PropertyContainerDividerContext.Provider>
    </>
}