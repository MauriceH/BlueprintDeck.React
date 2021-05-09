import {SelectionPropertyContent} from "./SelectionPropertyContent";
import React from "react";


export const PropertyPane = () => {
    return <div
        style={{
            flex: '1 1 auto',
            overflow: "auto",
            display: 'flex',
            flexDirection: 'column',
            alignItems: "start",
            padding: '10px'
        }}>
        <SelectionPropertyContent/>
    </div>
}