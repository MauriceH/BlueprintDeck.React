import React, {PropsWithChildren} from "react";
import {useStoreActions, useStoreState, useUpdateNodeInternals} from "react-flow-renderer";
import {BlueprintNodeData} from "../../../model/NodeData";
import {PortInputOutputType} from "../../../model/BluePrintRegistry";
import './PropertyContent.css'
import {PropertyDivider} from "../PropertyDivider/PropertyDivider";




const PropertySection = ({title}: { title: string }) => {
    return <h4 className="blueprint-property-section">{title}</h4>;
};

const PropertyValue = ({label, children}: PropsWithChildren<{ label: string }>) => {
    return <>
        <span className="blueprint-property-label">{label}</span>
        <PropertyDivider />
        <div className="blueprint-property-value-container">{children}</div>
    </>
}

export const PropertyContent = () => {
    const selection = useStoreState(x => x.selectedElements);

    const noSelection = (selection?.length ?? 0) <= 0;

    const nodes = useStoreState(x => x.nodes);

    const updateNode = useUpdateNodeInternals();


    if (noSelection) {
        return <><span>Keine Selektion</span></>
    }
    const selectedElement = nodes.find(x => x.id == selection![0].id)!;

    if (selectedElement == null) {
        return <><span>Keine Selektion</span></>
    }

    if (selectedElement.type == 'connection') return <></>

    const node = selectedElement as BlueprintNodeData;

    if (node.data == null) return <></>

    const inputPorts = node.data?.ports?.filter(x => x.inputOutputType == PortInputOutputType.Input) ?? [];
    const outputPorts = node.data?.ports?.filter(x => x.inputOutputType == PortInputOutputType.Output) ?? [];

    return <>
        <PropertySection title={"Default"}/>
        <PropertyValue label="Id"><div className="blueprint-property-value-text">{node.id}</div></PropertyValue>
        <PropertyValue label="Title"><input className="blueprint-property-value-text-input" type="text" value={node.data?.label} onChange={(event)=>{
            if(node.data == null) return;
            node.data.label = event.target.value
            updateNode(node.id)
        }}/></PropertyValue>
        <PropertyValue
            label="Position"> {"X: " + node.position.x.toFixed(0) + " Y: " + node.position.y.toFixed(0)}</PropertyValue>
        {inputPorts.length > 0 &&  <PropertySection title={"Input-Ports"}/>}

        {
            inputPorts.map(port =>
                <PropertyValue key={"input-" + port.key} label={port.title}>{port.dataType?.title ?? "Action"}</PropertyValue>
            )
        }
        {outputPorts.length > 0 && <PropertySection title={"Output-Ports"}/>}
        {
            outputPorts.map(port =>
                <PropertyValue key={"input-" + port.key} label={port.title}>{port.dataType?.title ?? "Action"}</PropertyValue>
            )
        }
    </>
}