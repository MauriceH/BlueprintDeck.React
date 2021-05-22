import {BluePrintDesign} from "../../model/BluePrintDesign";
import React from "react";

export const JsonDesignEditor = ({
                                     visible,
                                     design,
                                     setDesign
                                 }: { visible: boolean, design: BluePrintDesign, setDesign: (design: BluePrintDesign) => void; }) => {

    const visibility = !visible ? {display: 'none'} : {}

    return <textarea style={{
        left: 0,
        right: 0,
        top: 50,
        bottom: 0,
        position: "fixed",
        width: '100%',
        backgroundColor: "#000000c3",
        color: 'white',
        border: 0,
        zIndex: 1000, ...visibility
    }} value={JSON.stringify(design, null, 4)}
                     onChange={(event) => setDesign(JSON.parse(event.target.value))}/>
}