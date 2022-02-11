import React, {useContext} from "react";
import './PropertyContainer.css'
import {useStoreState} from "react-flow-renderer";
import {BlueprintNodeData} from "../../../model/NodeData";
import {LabeledInput} from "../../../shared/components/LabeledInput/LabeledInput";
import {PropertySection} from "../PropertySection/PropertySection";
import {NodePropertyEditorsContext, PropertyTypeEditorsContext} from "../PropertyTypeEditorsContext";
import {DefaultPropertyEditor} from "../PropertyEditor/DefaultPropertyEditor";
import {PropertyEditorPropTypes} from "../../../model/BluePrintRegistry";

export const PropertyContainer = () => {
    const selected = useStoreState(x => x.selectedElements);
    const propertyTypeEditors = useContext(PropertyTypeEditorsContext);
    const nodePropertyEditors = useContext(NodePropertyEditorsContext);

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
            <LabeledInput label={"Id"} readonly={true} type={"text"} value={node.id}/>
            <LabeledInput label={"Title"} readonly={true} type={"text"} value={node.data?.label}/>
            <LabeledInput label={"Position"} readonly={true} type={"text"}
                          value={'X: ' + node.position.x + ' Y: ' + node.position.y}/>
        </div>

        {(node.data?.registryNode?.properties?.length ?? 0) > 0 &&
          <PropertySection title={"Properties"}>
              {node.data?.registryNode?.properties?.map(property => {

                  let CustomEditor: React.FunctionComponent<PropertyEditorPropTypes> | null = null;
                  if(nodePropertyEditors != null) {
                      const id = node.data!.type + "." + property.name
                      CustomEditor = nodePropertyEditors[id]
                  }

                  if(CustomEditor == null && propertyTypeEditors != null) {
                      const typeName = property.dataType!.typeName
                      CustomEditor = propertyTypeEditors[typeName];
                  }

                  if (CustomEditor != null) return (<CustomEditor key={property.name} node={node} property={property}/>)
                  return (<DefaultPropertyEditor node={node} property={property} key={property.name}/>);
              })}
          </PropertySection>
        }


        {(inputPorts?.length ?? 0) > 0 &&
          <PropertySection title={"Input-Ports"}>
              {
                  inputPorts?.map(port =>
                      <LabeledInput key={"input-" + port.key} label={port.title ?? port.key} readonly={true}
                                    type={"text"} value={port.title}/>
                  )
              }
          </PropertySection>
        }

        {(outputPorts?.length ?? 0) > 0 &&
          <PropertySection title={"Output-Ports"}>
              {
                  outputPorts?.map(port =>
                      <LabeledInput key={"input-" + port.key} label={port.title ?? port.key} readonly={true}
                                    type={"text"} value={port.title}/>
                  )
              }
          </PropertySection>
        }
    </div>
}