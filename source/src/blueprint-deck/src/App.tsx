import React from "react";
import { Node } from "react-flow-renderer";
import "./App.css";
import { BlueprintDeck } from "./BlueprintDeck";
import { NodeTypes } from "./createElements";
import {BlueprintNodeData, NodeData} from "./NodeData";
import { BaseNode } from "./nodes/BaseNode";
import { TestDesign } from "./TestDesign";
import { TestRegistry } from "./TestRegistry";

const myTypes: NodeTypes = {
  TestNode: (node: BlueprintNodeData) => (
    <BaseNode node={node}>
      <div>Hallo1</div>
    </BaseNode>
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
