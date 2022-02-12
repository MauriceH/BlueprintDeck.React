import React, {useCallback, useEffect, useState} from "react";
import "./App.css";
import {BlueprintDeck} from "../BlueprintDeck";
import {NodeTypes} from "../nodes/createElements";
import {BlueprintNodeData} from "../model/NodeData";
import {BaseNode} from "../nodes/BaseNode";
import {TopBarActiveButton, TopBarButton} from "./components/TopBarButton";
import CodeSolidIco from './components/code-solid.svg'
import {JsonDesignEditor} from "./components/JsonDesignEditor";
import {BluePrintRegistry, NodePropertyEditors, PropertyTypeEditors} from "../model/BluePrintRegistry";
import {Blueprint} from "../model/Blueprint";
import {BlindsSelectorPropertyEditor} from "./containers/BlindsSelectorPropertyEditor/BlindsSelectorPropertyEditor";

const myTypes: NodeTypes = {
    TestNode: (node: BlueprintNodeData) => (
        <BaseNode node={node}/>
    )
};

const myPropertyTypesEditors: PropertyTypeEditors = {
    "System.TimeSpana": BlindsSelectorPropertyEditor
}

const myNodePropertyEditors: NodePropertyEditors = {
    "BlindsActor.BlindsId": BlindsSelectorPropertyEditor
}

function App() {

    const [showJson, setShowJson] = useState(false)
    const [design, setDesign] = useState<Blueprint | null>(null);
    const [registry, setRegistry] = useState<BluePrintRegistry | null>(null);

    // useEffect(() => {
    //
    //     console.log('App.onDesign', design)
    //
    // }, [design])

    const loadRegistryFromStock = () => {

    }

    const fetchNewRegistry = useCallback(() => {
        fetch("http://localhost:15000/api/Blueprint/registry")
            .then(response => response.json())
            .then(data => {
                const newRegistry = (data as BluePrintRegistry);
                localStorage.setItem("REGISTRY", JSON.stringify(newRegistry))
                setRegistry(newRegistry);
            })
    }, [setRegistry])

    const loadDesignFromStock = () => {

    }

    const fetchNewDesign = useCallback(() => {
        fetch("http://localhost:15000/api/Blueprint/blueprints/d3017ce7-4904-4acb-8437-a5ad52df054f")
            .then(response => response.json())
            .then(data => {
                console.log('data', data);
                const newDesign = (data as Blueprint);
                localStorage.setItem("DESIGN", JSON.stringify(newDesign))
                setDesign(newDesign);
            })
    }, [setDesign])

    useEffect(() => {
        let data = localStorage.getItem("REGISTRY")
        if (data == null) return;
        const registry = JSON.parse(data) as BluePrintRegistry;
        setRegistry(registry);
        if (registry == null) return;
        data = localStorage.getItem("DESIGN")
        if (data == null) return;
        const design = JSON.parse(data) as Blueprint;
        setDesign(design);

    }, [setRegistry, setDesign])


    if (registry == null) return <div>No registry</div>
    if (design == null) return <div>No design</div>

    return (
        <div className="App" style={{display: 'flex', flexDirection: 'column'}}>
            <div style={{
                height: 50,
                backgroundColor: 'rgb(72 83 143)',
                display: 'flex',
                alignItems: 'center',
                color: 'white',
                padding: '0px 20px'
            }}>
                <span style={{padding: '0px 20px 0px 0px'}}>BlueprintDeck TestApp</span>
                <div style={{flex: '1 0 auto'}}/>
                <TopBarButton onClick={() => fetchNewDesign}> Load Design from Server</TopBarButton>
                <div style={{width: '15px'}}/>
                <TopBarButton onClick={() => fetchNewRegistry}> Load Registry from Server</TopBarButton>
                <div style={{width: '15px'}}/>
                <TopBarActiveButton active={showJson} onClick={() => setShowJson(!showJson)}>
                    <img src={CodeSolidIco}
                         style={{
                             width: '20px',
                             height: '20px',
                             marginRight: '5px'
                         }}/>JSON</TopBarActiveButton>
            </div>
            <JsonDesignEditor visible={showJson} design={design} setDesign={setDesign}/>
            <div style={{display: 'flex', flexDirection: 'column', flex: '1 0 auto'}}>

                {registry == null && <div>LAODING</div>}

                {registry != null &&
                  <BlueprintDeck
                    design={design}
                    registry={registry}
                    nodeTypes={myTypes}
                    propertyTypeEditors={myPropertyTypesEditors}
                    nodePropertyEditors={myNodePropertyEditors}
                    onDesignChanged={setDesign}
                  />
                }
            </div>

        </div>
    );
}

export default App;
