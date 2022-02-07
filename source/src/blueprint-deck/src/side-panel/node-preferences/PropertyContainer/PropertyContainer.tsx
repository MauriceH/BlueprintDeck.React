import React from "react";
import {PropertyEditor} from "../PropertyContent/PropertyEditor";
import './PropertyContainer.css'
import {useStoreState} from "react-flow-renderer";
import {BlueprintNodeData} from "../../../model/NodeData";
import {LabelAndInput} from "../../../shared/components/EditorWithLabel/LabelAndInput";
import {PropertySection} from "../PropertySection/PropertySection";

export const PropertyContainer = () => {
    const selected = useStoreState(x => x.selectedElements);

    const noSelection = (selected?.length ?? 0) <= 0;


    if (noSelection) {
        return <div className="property-pane"><span>Keine Selektion</span></div>
    }

    const selectedElement = selected![0];

    if (selectedElement.type == 'connection') return <></>

    const node = selectedElement as BlueprintNodeData;

    const inputPorts = node.data?.ports?.filter(x => x.direction == 'Input');
    const outputPorts = node.data?.ports?.filter(x => x.direction == 'Output');


    return <div className="property-container">
        <div style={{padding: '5px 5px 15px 5px'}}>
            <LabelAndInput label={"Id"} readonly={true} type={"text"} value={node.id}/>
            <LabelAndInput label={"Title"} readonly={true} type={"text"} value={node.data?.label}/>
            <LabelAndInput label={"Position"} readonly={true} type={"text"}
                           value={'X: ' + node.position.x + ' Y: ' + node.position.y}/>
        </div>

        {(node.data?.registryNode?.properties?.length ?? 0) > 0 &&
          <PropertySection title={"Properties"}>
              {node.data?.registryNode?.properties?.map(property =>
                  (<PropertyEditor node={node} property={property} key={property.name}/>))}
          </PropertySection>
        }


        {(inputPorts?.length ?? 0) > 0 &&
          <PropertySection title={"Input-Ports"}>
              {
                  inputPorts?.map(port =>
                      <LabelAndInput key={"input-" + port.key} label={port.title ?? port.key} readonly={true}
                                     type={"text"} value={port.title}/>
                  )
              }
          </PropertySection>
        }

        {(outputPorts?.length ?? 0) > 0 &&
          <PropertySection title={"Output-Ports"}>
              {
                  outputPorts?.map(port =>
                      <LabelAndInput key={"input-" + port.key} label={port.title ?? port.key} readonly={true}
                                     type={"text"} value={port.title}/>
                  )
              }
          </PropertySection>
        }
    </div>
}