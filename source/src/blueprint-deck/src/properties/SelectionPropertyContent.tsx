import React from "react";
import {useStoreState} from "react-flow-renderer";
import {BlueprintNodeData} from "../NodeData";
import {PortInputOutputType} from "../BluePrintRegistry";


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
        <h5>Properties</h5>
        <div><label>Title:</label>{node.data?.label}</div>
        <div><label>Id:</label>{node.id}</div>
        <h5>Inputs</h5>
        {
            node.data?.ports?.filter(x => x.inputOutputType == PortInputOutputType.Input).map(port => <>
                <div key={port.key}><label>{port.title}</label></div>
            </>)
        }
        <h5>Outputs</h5>
        {
            node.data?.ports?.filter(x => x.inputOutputType == PortInputOutputType.Output).map(port => <>
                <div key={port.key}><label>{port.title}</label></div>
            </>)
        }
    </>
}