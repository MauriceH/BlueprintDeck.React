import ReactFlow, {
    addEdge,
    Background,
    BackgroundVariant,
    Connection,
    Controls,
    Edge,
    Elements,
    MiniMap,
    OnLoadParams
} from "react-flow-renderer";
import React, {useEffect, useState} from "react";
import {BluePrintRegistry} from "./BluePrintRegistry";
import {BluePrintDesign} from "./BluePrintDesign";
import {createElements, NodeTypes} from "./nodes/createElements";
import {NodeData} from "./NodeData";
import {checkValidConnection} from "./nodes/checkValidConnection";
import {defaultReactNodes} from "./nodes/defaults/defaultReactNodes";

export interface NodeAreaOptions {
    registry: BluePrintRegistry
    design?: BluePrintDesign
    nodeTypes: NodeTypes
}

const onLoad = (reactFlowInstance: OnLoadParams) => reactFlowInstance.fitView();


export const NodeArea = ({registry, design, nodeTypes}: NodeAreaOptions) => {

    const [isConnectable, setConnectable] = useState(true);
    const [elements, setElements] = useState<Elements<NodeData>>([]);
    const onConnect = (connection: Edge | Connection) => setElements((els) => addEdge(connection, els));

    const refElements = React.useRef(elements);
    const isValidConnection = checkValidConnection(refElements, registry);

    useEffect(() => {
        let designData = design;
        if (designData == null) {
            designData = {constantValues: [], nodes: [], connections: []}
        }
        const initialElements = createElements(registry, designData, isValidConnection);
        setElements(initialElements)
    }, [setElements, registry, design])

    useEffect(()=>{
        refElements.current = elements;
    },[elements])

    return <ReactFlow
        onLoad={onLoad}
        elements={elements}
        nodesConnectable={isConnectable}
        nodeTypes={{...defaultReactNodes, ...nodeTypes}}
        onConnect={onConnect}
        snapGrid={[20, 20]}
        snapToGrid={true}

    >
        <Background variant={BackgroundVariant.Lines} gap={20}/>
        <MiniMap/>
        <Controls/>
    </ReactFlow>;
};