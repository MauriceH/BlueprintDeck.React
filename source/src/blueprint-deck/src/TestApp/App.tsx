import React, {useEffect, useState} from "react";
import "./App.css";
import {BlueprintDeck} from "../BlueprintDeck";
import {NodeTypes} from "../nodes/createElements";
import {BlueprintNodeData} from "../model/NodeData";
import {BaseNode} from "../nodes/BaseNode";
import {TestDesign} from "./TestDesign";
import {TestRegistry} from "./TestRegistry";
import {TopBarActiveButton} from "./components/TopBarButton";
import CodeSolidIco from './components/code-solid.svg'
import {JsonDesignEditor} from "./components/JsonDesignEditor";

const myTypes: NodeTypes = {
    TestNode: (node: BlueprintNodeData) => (
        <BaseNode node={node}/>
    ),
};

function App() {

    const [showJson, setShowJson] = useState(false)
    const [design, setDesign] = useState(TestDesign)

    useEffect(() => {

        console.log('App.onDesign', design)

    }, [design])



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
                <div style={{flex: '1 0 auto'}} />
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

                <BlueprintDeck
                    design={design}
                    registry={TestRegistry}
                    nodeTypes={myTypes}
                    onDesignChanged={setDesign}
                />
            </div>

        </div>
    );
}

export default App;
