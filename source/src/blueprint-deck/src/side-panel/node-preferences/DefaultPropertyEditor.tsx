import React from "react";
import {PropertyEditor, PropertyEditorElementProps, PropertyEditorProps} from "./PropertyEditor/PropertyEditor";
import {InputProps, LabeledInput} from "../../shared/components/LabeledInput/LabeledInput";

const InternalEditor = ({property, registryTypeName, value, setValue}: PropertyEditorElementProps)=> {

    let inputProps = {} as InputProps
    let type = 'text';

    if(registryTypeName == 'System.TimeSpan') {
        type = 'time'
        inputProps = {step: 1}
    }
    if(registryTypeName == 'System.Int64') {
        type = 'number'

    }
    if(registryTypeName == 'System.Int32') {
        type = 'number'
        inputProps = {min:"-2147483647", max:"2147483647"}
    }
    if(registryTypeName == 'System.DateTime') {
        type = 'datetime-local'
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