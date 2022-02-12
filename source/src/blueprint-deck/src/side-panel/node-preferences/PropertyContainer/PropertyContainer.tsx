import React, {useCallback, useContext, useEffect, useState} from "react";
import './PropertyContainer.css'
import {FlowElement, useStoreState, useUpdateNodeInternals} from "react-flow-renderer";
import {BlueprintNodeData} from "../../../model/NodeData";
import {LabeledInput} from "../../../shared/components/LabeledInput/LabeledInput";
import {PropertySection} from "../PropertySection/PropertySection";
import {NodePropertyEditorsContext, PropertyTypeEditorsContext} from "../../../NodeArea/PropertyTypeEditorsContext";
import {DefaultPropertyEditor} from "../DefaultPropertyEditor";
import {PropertyEditorPropTypes} from "../../../model/BluePrintRegistry";

export const useSelectedNode = () : BlueprintNodeData | null => {
    const selected = useStoreState(x => x.selectedElements);
    if(selected == null || (selected?.length ?? 0) <= 0) return null;
    if(selected[0].type == 'connection') return null;
    return selected[0] as BlueprintNodeData;
}

export const PropertyContainer = () => {
    const selected = useSelectedNode();
    const propertyTypeEditors = useContext(PropertyTypeEditorsContext);
    const nodePropertyEditors = useContext(NodePropertyEditorsContext);

    const [title, setTitle] = useState("")
    const updateNodes = useUpdateNodeInternals();

    useEffect(()=>{
        setTitle(selected?.data?.label ?? "")
    },[selected, setTitle])

    const onTitleChange = useCallback(newTitle => {
        if(selected?.data != null) {
            selected.data.label = newTitle
            updateNodes(selected.id)
        }
        setTitle(newTitle)
    },[selected, updateNodes, setTitle])

    if (selected == null) {
        return <div className="property-pane"><span>Keine Selektion</span></div>
    }

    const node = selected;

    const inputPorts = node.data?.ports?.filter(x => x.direction == 'Input');
    const outputPorts = node.data?.ports?.filter(x => x.direction == 'Output');


    return <div className="property-container">
        <div style={{padding: '5px 5px 15px 5px'}}>
            <LabeledInput label={"Id"} readonly={true} type={"text"} value={node.id}/>
            <LabeledInput label={"Title"} readonly={false} type={"text"} value={title} onChange={onTitleChange}/>
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