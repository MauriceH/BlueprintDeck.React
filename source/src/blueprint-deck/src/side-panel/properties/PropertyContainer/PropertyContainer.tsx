import React from "react";
import {PropertyContent} from "../PropertyContent/PropertyContent";
import './PropertyContainer.css'
import {useStoreState} from "react-flow-renderer";
import {BlueprintNodeData} from "../../../model/NodeData";

export const PropertyContainer = () => {
    const selected = useStoreState(x => x.selectedElements);

    const noSelection = (selected?.length ?? 0) <= 0;


    if (noSelection) {
        return <div className="property-pane"><span>Keine Selektion</span></div>
    }

    const selectedElement = selected![0];

    if (selectedElement.type == 'connection') return <></>

    const node = selectedElement as BlueprintNodeData;


    return <div className="property-pane">
        <PropertyContent node={node}/>
    </div>
}