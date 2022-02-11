import React from "react";
import './BlindsSelectorPropertyEditor.css'
import {LabeledComponent} from "../../../shared/components/LabeledComponent/LabeledComponent";
import {
    PropertyEditor,
    PropertyEditorElementProps,
    PropertyEditorProps
} from "../../../side-panel/node-preferences/PropertyEditor/PropertyEditor";


export const InternalEditor = ({property,value,setValue}: PropertyEditorElementProps) => {


    return (
        <LabeledComponent label={property.name}>
            <>
                <input className={"blinds-selector_input"} type="text" value={value} onChange={(e)=>setValue(e.target.value)} list="blinds-list"/>
                <datalist id="blinds-list">
                    <option value="Rollo Küche"/>
                    <option value="Rollo Wintergarten"/>
                </datalist>
            </>
        </LabeledComponent>
    )
}

export const BlindsSelectorPropertyEditor = (props: PropertyEditorProps) => <PropertyEditor {...props} Element={InternalEditor}/>




