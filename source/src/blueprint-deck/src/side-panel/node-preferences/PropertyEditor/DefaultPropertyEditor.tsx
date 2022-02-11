import React from "react";
import {PropertyEditor, PropertyEditorElementProps, PropertyEditorProps} from "./PropertyEditor";
import {InputProps, LabeledInput} from "../../../shared/components/LabeledInput/LabeledInput";

const InternalEditor = ({property, registryTypeName, value, setValue}: PropertyEditorElementProps)=> {

    let inputProps = {} as InputProps
    let type = 'text';

    if(registryTypeName == 'system.timespan') {
        type = 'time'
        inputProps = {step: 1}
    }

    return (
        <LabeledInput label={property.name}
                      type={type}
                      value={value}
                      onChange={setValue}
                      readonly={false}
                      inputProps={inputProps}/>
    )
}

export const DefaultPropertyEditor = (props: PropertyEditorProps) => <PropertyEditor {...props} Element={InternalEditor}/>