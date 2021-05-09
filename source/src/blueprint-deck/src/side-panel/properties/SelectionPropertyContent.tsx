import React from "react";
import {useStoreState} from "react-flow-renderer";
import {BlueprintNodeData} from "../../NodeData";
import {PortInputOutputType} from "../../BluePrintRegistry";


const PropertySection = ({title}:{title: string}) => {
    return <h4 style={{width: '100%', textAlign: "left", padding: '4px 0px', borderBottom: 'solid 1px #ccc'}}>{title}</h4>;
};

export const SelectionPropertyContent = () => {
    const selected = useStoreState(x => x.selectedElements);

    const noSelection = (selected?.length ?? 0) <= 0;


    if (noSelection) {
        return <><span>Keine Selektion</span></>
    }

    const selectedElement = selected![0];

    if (selectedElement.type == 'connection') return <></>

    const node = selectedElement as BlueprintNodeData;

    return <>
        <PropertySection title={"Properties"}/>
        <div><label style={{width: '80px', display: 'inline-block', textAlign: "left"}}>Title:</label>{node.data?.label}</div>
        <div><label style={{width: '80px', display: 'inline-block', textAlign: "left"}}>Id:</label>{node.id}</div>
        <PropertySection title={"Input-Ports"}/>

        {
            node.data?.ports?.filter(x => x.inputOutputType == PortInputOutputType.Input).map(port =>
                <div key={"input-" + port.key}><label >{port.title}</label></div>
            )
        }
        <PropertySection title={"Output-Ports"}/>
        {
            node.data?.ports?.filter(x => x.inputOutputType == PortInputOutputType.Output).map(port =>
                <div key={"output-" + port.key}><label>{port.title}</label></div>
            )
        }
    </>
}