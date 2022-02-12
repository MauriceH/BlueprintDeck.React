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
        <LabeledComponent label={"Blinds"}>
            <>
                <select className={"blinds-selector_select"} value={value} onChange={(e)=>setValue(e.target.value)}>
                    <option className={"blinds-selector_option"} value={123}>Rollo Küche</option>
                    <option className={"blinds-selector_option"} value={1234}>Rollo Wintergarten</option>
                </select>
            </>
        </LabeledComponent>
    )
}

export const BlindsSelectorPropertyEditor = (props: PropertyEditorProps) => <PropertyEditor {...props} Element={InternalEditor}/>




