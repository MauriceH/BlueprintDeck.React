import React, {useEffect, useState} from "react";
import "./App.css";
import {BlueprintDeck} from "./BlueprintDeck";
import {NodeTypes} from "./nodes/createElements";
import {BlueprintNodeData} from "./NodeData";
import {BaseNode} from "./nodes/BaseNode";
import {TestDesign} from "./TestDesign";
import {TestRegistry} from "./TestRegistry";

const myTypes: NodeTypes = {
    TestNode: (node: BlueprintNodeData) => (
        <BaseNode node={node}/>
    ),
};

function App() {

    const [design, setDesign] = useState(TestDesign)

    useEffect(()=>{

        console.log('App.onDesign', design)

    },[design])

    return (
        <div className="App">
            <BlueprintDeck
                design={design}
                registry={TestRegistry}
                nodeTypes={myTypes}
                onDesignChanged={setDesign}
            />
        </div>
    );
}

export default App;
