import React from "react";


export interface TabHeaderProps {
    title: string,
    active: boolean,
    onClick: ()=>void;
};

export const TabHeader = ({title, active, onClick}: TabHeaderProps) => {
    let activeStyle = {}
    if (active) {
        activeStyle = {
            borderBottom: 'solid 2px #777',
        }
    }
    return <div style={{padding: '4px 6px', cursor: 'pointer',...activeStyle}} onClick={onClick}>
        {title}
    </div>
}