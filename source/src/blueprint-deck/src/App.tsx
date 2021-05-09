import React from "react";
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
  return (
    <div className="App">
      <BlueprintDeck
        design={TestDesign}
        registry={TestRegistry}
        nodeTypes={myTypes}
      />
    </div>
  );
}

export default App;
