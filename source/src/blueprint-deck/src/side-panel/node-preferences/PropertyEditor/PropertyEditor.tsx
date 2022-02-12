import React, {FunctionComponent, useCallback, useEffect, useState} from "react";
import {BlueprintNodeData} from "../../../model/NodeData";
import './PropertyEditor.css'
import {RegistryProperty} from "../../../model/BluePrintRegistry";
import {camelize} from "../../../shared/camelize";
import {useUpdateNodeInternals} from "react-flow-renderer";


export type PropertyEditorElementProps = {property: RegistryProperty, value: string, setValue: (val: string) => any, registryTypeName: string}

export type PropertyEditorProps = { node: BlueprintNodeData, property: RegistryProperty}

export type PropertyEditorComponentProps = PropertyEditorProps & { Element: FunctionComponent<PropertyEditorElementProps>};

export const PropertyEditor = ({node, property, Element}:PropertyEditorComponentProps) => {
    const [value, setValue] = useState<string>("")
    const updateNode = useUpdateNodeInternals();

    useEffect(()=>{
        if(node.data?.properties == null) return;
        const propValue = node.data?.properties[camelize(property.name)] as any
        setValue(propValue);
    },[node,setValue])


    const onChange = useCallback(value=> {
        if(node.data == null) return;
        if(node.data.properties == null) {
            node.data.properties = {}
        }
        node.data.properties[camelize(property.name)] = value;
        setValue(value)
        updateNode(node.id)
    },[node,setValue,updateNode]);

    const registryTypeName = property.dataType!.typeName

    return <Element property={property} value={value} setValue={onChange} registryTypeName={registryTypeName} />

}




