import React from "react";
import './TabHeader.css';

export interface TabHeaderProps {
    title: string,
    active: boolean,
    onClick: ()=>void;
}

export const TabHeader = ({title, active, onClick}: TabHeaderProps) => {
    const className = "tab-header" + (active ? " tab-active" : "");
    return <div className={className} onClick={onClick}>
        {title}
    </div>
}