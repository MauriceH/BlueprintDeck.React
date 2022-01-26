import {isNode, useStoreState} from "react-flow-renderer";
import React, {KeyboardEvent, useCallback, useEffect, useRef} from "react";
import {useNodeDelete} from "./NodeEventsContext";
import {BlueprintNodeData} from "../model/NodeData";

export const KeyHandler = () => {
    const selectedElements = useStoreState(store => store.selectedElements)
    useEffect(() => {

    }, [selectedElements])

    const nodeEvents = useNodeDelete();

    const onDeleteKey = useCallback(() => {
        const selectedNodes = selectedElements?.filter(x=>isNode(x));
        if(selectedNodes == null || selectedNodes.length <= 0) return;
        const first = selectedNodes[0] as BlueprintNodeData;
        nodeEvents(first)
    }, [selectedElements, nodeEvents])

    const onKey = useCallback((key: string) => {
        if (key == "Delete") {
            onDeleteKey();
        }
    }, [onDeleteKey])

    const ref = useRef<HTMLDivElement>();

    useEffect(()=>{
        if(ref.current != null) {
            ref.current?.focus()
        }
    },[ref])

    useEffect(()=>{
        const keyEvent = (event: any) => {
            onKey((event as KeyboardEvent<any>).key)
        }
        window.addEventListener("keydown", keyEvent,false )
        return ()=>{
            window.addEventListener("keydown", keyEvent,false )
        }
    })
    return <></>


}