import React from 'react';
import './App.css';
import {BlueprintDeck} from "./BlueprintDeck";
import {TestDesign} from "./TestDesign";
import {TestRegistry} from "./TestRegistry";
import {NodeTypesType, Node} from "react-flow-renderer";
import {BaseNode} from "./nodes/BaseNode";
import {NodeData} from "./NodeData";
import {NodeTypes} from "./createElements";



const myTypes: NodeTypes = {
    TestNode: (node:Node<NodeData>)=> <BaseNode node={node}><div>Hallo1</div></BaseNode>,
}

function App() {
    return (
        <div className="App">
            <BlueprintDeck design={TestDesign} registry={TestRegistry} nodeTypes={myTypes}/>
        </div>
    );
}

export default App;
