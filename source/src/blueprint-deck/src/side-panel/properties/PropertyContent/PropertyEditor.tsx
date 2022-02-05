import React, {useCallback, useEffect, useState} from "react";
import {BlueprintNodeData} from "../../../model/NodeData";
import './PropertyEditor.css'
import {RegistryDataType, RegistryProperty} from "../../../model/BluePrintRegistry";
import {InputProps, LabelAndInput} from "../../../shared/components/EditorWithLabel/LabelAndInput";
import {camelize} from "../../../shared/camelize";


export const PropertyEditor = ({node, property}:{node: BlueprintNodeData, property: RegistryProperty}) => {
    const [value, setValue] = useState<string>("")

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
    },[node,setValue]);

    const registryTypeName = property.dataType?.typeName?.toLocaleLowerCase()
    let inputProps = {} as InputProps
    let type = 'text';

    if(registryTypeName == 'system.timespan') {
        type = 'time'
        inputProps = {step: 1}
    }

    return (
        <LabelAndInput label={property.name}
                       type={type}
                       value={value}
                       onChange={onChange}
                       readonly={false}
                       inputProps={inputProps}/>
    )
}




