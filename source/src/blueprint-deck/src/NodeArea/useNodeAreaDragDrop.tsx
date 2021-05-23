import React, {useCallback} from "react";
import {ReactFlowRefType} from "react-flow-renderer/dist/container/ReactFlow";
import {Elements, OnLoadParams} from "react-flow-renderer";
import {BluePrintRegistry} from "../model/BluePrintRegistry";
import {NodeData} from "../model/NodeData";
import {getDragData} from "./SetDragData";
import {DesignConstantValue, DesignNode} from "../model/Blueprint";
import {v4 as uuid} from "uuid";
import {createConstantValueElement, createNodeElement} from "../nodes/createElements";
import {Node} from "react-flow-renderer/dist/types";

export function useNodeAreaDragDrop(reactFlowWrapper: React.RefObject<ReactFlowRefType>, reactFlowInstance: OnLoadParams<any> | null, registry: BluePrintRegistry, setElements: React.Dispatch<React.SetStateAction<Elements<NodeData>>>) {
    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move' ;
    }, []);

    const onDrop = useCallback((event) => {
        event.preventDefault();
        if (reactFlowWrapper.current == null || reactFlowInstance == null) return;
        const data = getDragData(event.dataTransfer);
        if(data.type == '') return;

        const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
        if (data.type == null || data.title == null || data.nodeType == null) return;

        const position = reactFlowInstance.project({
            x: event.clientX - reactFlowBounds.left - 100,
            y: event.clientY - reactFlowBounds.top - 15,
        });

        if (data.type == 'node') {

            const newNode: DesignNode = {
                key: uuid(),
                nodeTypeKey: data.nodeType,
                title: data.title,
                location: position
            }
            const newElement = createNodeElement(registry, newNode);
            setElements((es) => es.concat(newElement as Node<NodeData>));
        } else {
            const newValue: DesignConstantValue = {
                key: uuid(),
                nodeTypeKey: data.nodeType,
                title: data.title,
                location: position,
                value: ''
            }
            const newElement = createConstantValueElement(registry, newValue);
            setElements((es) => es.concat(newElement as Node<NodeData>));
        }

    }, [reactFlowInstance, reactFlowWrapper, registry]);
    return {onDragOver, onDrop};
}