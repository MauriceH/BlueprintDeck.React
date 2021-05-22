import React from "react";
import {useStoreState} from "react-flow-renderer";
import {BlueprintNodeData} from "../../NodeData";
import {PortInputOutputType} from "../../BluePrintRegistry";
import './SelectionPropertyContent.css'


const PropertySection = ({title}:{title: string}) => {
    return <h4 style={{width: '100%', textAlign: "left", padding: '4px 0px', marginBottom: '5px', borderBottom: 'solid 1px #ccc'}}>{title}</h4>;
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
        <PropertySection title={"Default"}/>
        <div className={"property-value"}>
            <label style={{display:"block"}}>Id:</label>
            {/*<input type={"text"} value={node.id}/>*/}
        </div>
        <div className={"property-value"}><label>Title:</label>{node.data?.label}</div>
        <div className={"property-value"}><label>Position:</label>{node.data?.label}</div>
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