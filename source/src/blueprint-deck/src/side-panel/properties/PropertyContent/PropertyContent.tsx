import React, {PropsWithChildren} from "react";
import {useStoreState} from "react-flow-renderer";
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


    if (noSelection) {
        return <><span>Keine Selektion</span></>
    }
    const selectedElement = nodes.find(x => x.id == selection![0].id)!;

    if (selectedElement.type == 'connection') return <></>

    const node = selectedElement as BlueprintNodeData;

    return <>
        <PropertySection title={"Default"}/>
        <PropertyValue label="Id">{node.id}</PropertyValue>
        <PropertyValue label="Title">{node.data?.label}</PropertyValue>
        <PropertyValue
            label="Position"> {"X: " + node.position.x.toFixed(0) + " Y: " + node.position.y.toFixed(0)}</PropertyValue>
        <PropertySection title={"Input-Ports"}/>

        {
            node.data?.ports?.filter(x => x.inputOutputType == PortInputOutputType.Input).map(port =>
                <PropertyValue key={"input-" + port.key} label={port.title}>{port.dataType?.title}</PropertyValue>
            )
        }
        <PropertySection title={"Output-Ports"}/>
        {
            node.data?.ports?.filter(x => x.inputOutputType == PortInputOutputType.Output).map(port =>
                <PropertyValue key={"input-" + port.key} label={port.title}>{port.dataType?.title}</PropertyValue>
            )
        }
    </>
}