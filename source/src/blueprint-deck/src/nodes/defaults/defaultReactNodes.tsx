import {NodeTypesType} from "react-flow-renderer/dist/types";
import {ActivateNode} from "./ActivateNode";
import {BlueprintNodeData} from "../../model/NodeData";
import {BaseNode} from "../BaseNode";
import React from "react";

export const defaultReactNodes: NodeTypesType = {
    'Activate': ActivateNode,
    'Default': (node: BlueprintNodeData) => <BaseNode node={node}/>
};