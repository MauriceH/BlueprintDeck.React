import {NodeTypesType} from "react-flow-renderer/dist/types";
import ConstantValueNode from "./ConstantValueNode";
import {ActivateNode} from "./ActiveateNode";
import {BlueprintNodeData} from "../../NodeData";
import {BaseNode} from "../BaseNode";
import React from "react";

export const defaultReactNodes: NodeTypesType = {
    constantValueNode: ConstantValueNode,
    'Activate': ActivateNode,
    'Delay': (node: BlueprintNodeData) => <BaseNode node={node}>DELAY</BaseNode>
};