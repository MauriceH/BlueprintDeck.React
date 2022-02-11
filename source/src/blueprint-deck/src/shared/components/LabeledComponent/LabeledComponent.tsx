import React, {PropsWithChildren} from "react";
import './LabeledComponent.css'

export interface LabeledComponentProps {
    label: string;
    padding?: string;
}

export const LabeledComponent = (props:PropsWithChildren<LabeledComponentProps>) => {
    const {label, padding, children} = props;

    return (
        <div className="labeled-component_container" style={{padding: padding}}>
            <label className="labeled-component_label">{label}</label>
            <div className={"labeled-component_children"}>{children}</div>
        </div>
    )
}