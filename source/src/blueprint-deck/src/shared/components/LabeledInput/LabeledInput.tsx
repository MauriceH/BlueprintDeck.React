import React from "react";
import './LabeledInput.css'
import {LabeledComponent, LabeledComponentProps} from "../LabeledComponent/LabeledComponent";

export interface LabeledInputProps extends LabeledComponentProps {
    value: any;
    readonly: boolean;
    onChange?: (val: string) => any;
    type: string;
    inputProps?: InputProps;
}

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;


export const LabeledInput = (props: LabeledInputProps) => {
    const {label, readonly, value, onChange, type, inputProps, padding} = props;

    return (
        <LabeledComponent label={label} padding={padding}>
            <input className={"label-and-input_input"} {...inputProps} readOnly={readonly} type={type} value={value}
                   onChange={e => {if(onChange != null) {onChange(e.target.value)}}}/>
        </LabeledComponent>
    )
}