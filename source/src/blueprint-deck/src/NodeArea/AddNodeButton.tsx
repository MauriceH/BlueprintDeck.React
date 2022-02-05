import React from "react";
import './AddNodeButton.css'



export const AddNodeButton = ({onClick}:{onClick: ()=> any;}) => {
    return (
        <>
            <div className="add-node-button-container">
                <div className={"add-node-button"} onClick={onClick}>
                    +
                </div>
            </div>
        </>
    )
}