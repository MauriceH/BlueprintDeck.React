import React, {useCallback, useEffect, useState} from "react";
import {BlueprintNodeData} from "../../../model/NodeData";
import './PropertyContent.css'
import {RegistryProperty} from "../../../model/BluePrintRegistry";


const PropertyEditor = ({node, property}:{node: BlueprintNodeData, property: RegistryProperty}) => {
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


    return (
        <div className={"property-value"}>
            <label>{property.name}:</label>
            <input className={"text-input"} type="text" value={value} onChange={e =>onChange(e.target.value)} />
        </div>
    )
}

const PropertySection = ({title}: { title: string }) => {
    return <h4 style={{
        width: '100%',
        textAlign: "left",
        padding: '4px 0px',
        marginBottom: '5px',
        borderBottom: 'solid 1px #ccc'
    }}>{title}</h4>;
};

export const PropertyContent = ({node}: { node: BlueprintNodeData }) => {


    return <>
        <div className={"property-value"}>
            <label>Id:</label>
            <div style={{fontSize: '0.7em', display: "inline"}}>{node.id}</div>
        </div>
        <div className={"property-value"}><label>Title:</label>
            {node.data?.label}</div>
        <div className={"property-value"}><label>Position:</label>X:{node.position.x}</div>

        <PropertySection title={"Properties"}/>

        {node.data?.registryNode.properties.map(property =>
            (<PropertyEditor node={node} property={property} key={property.name}/>))}


        <PropertySection title={"Input-Ports"}/>

        {
            node.data?.ports?.filter(x => x.direction == 'Input').map(port =>
                <div key={"input-" + port.key}><label>{port.title}</label></div>
            )
        }
        <PropertySection title={"Output-Ports"}/>
        {
            node.data?.ports?.filter(x => x.direction == 'Output').map(port =>
                <div key={"output-" + port.key}><label>{port.title}</label></div>
            )
        }
    </>
}

const camelize = (str: string) => str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
    return index === 0 ? word.toLowerCase() : word.toUpperCase();
}).replace(/\s+/g, '');