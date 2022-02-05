import React, {PropsWithChildren, useCallback, useState} from "react";
import './PropertySection.css'
import {TriangleSmallDownIcon, TriangleSmallUpIcon} from "../../../shared/icons/triangle-small-down";

export const PropertySection = ({title, children}: PropsWithChildren<{ title: string }>) => {
    const [isOpen, setIsOpen] = useState(true);


    const onFlip = useCallback(() => {
        setIsOpen(!isOpen)
    }, [isOpen, setIsOpen]);


    return (
        <div>
            <div className={"property-section_header"}>
                <div className={"property-section_header_button"} onClick={onFlip}>
                    {isOpen ? <TriangleSmallUpIcon/> : <TriangleSmallDownIcon/>}
                </div>
                <div className={"property-section_header_title"}>{title}</div>
            </div>
            <div
                className={'property-section_content-container property-section_content-container_' + (isOpen ? "open" : "closed")}>
                {children}
            </div>
        </div>
    );
};