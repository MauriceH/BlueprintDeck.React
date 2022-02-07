import React from "react";
import './LabelAndInput.css'

export interface EditorWithLabelProps {
    value: any;
    label: string;
    readonly: boolean;
    onChange?: (val: string) => any;
    type: string;
    inputProps?: InputProps;
    padding?: string
}

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;


export const LabelAndInput = (props: EditorWithLabelProps) => {
    const {label, readonly, value, onChange, type, inputProps} = props;

    return (
        <div className="label-and-input_container" style={{padding: props.padding}}>
            <label className="label-and-input_label">{label}</label>
            <input className={"label-and-input_input"} {...inputProps} readOnly={readonly} type={type} value={value}
                   onChange={e => {if(onChange != null) {onChange(e.target.value)}}}/>
        </div>
    )
}