import React from "react";
import {BlueprintNodeData} from "../../model/NodeData";
import {BaseNode} from "../BaseNode";

export const ActivateNode = (node: BlueprintNodeData) => {
    return (
        <BaseNode node={node} />
    );
};