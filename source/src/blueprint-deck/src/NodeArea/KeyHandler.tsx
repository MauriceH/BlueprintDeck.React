import {isNode, useStoreState} from "react-flow-renderer";
import React, {EventHandler, KeyboardEvent, KeyboardEventHandler, useCallback, useEffect, useRef} from "react";
import {NodeEventsContext, useNodeDelete} from "./NodeEventsContext";
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
            const keyEvent = event as KeyboardEvent<any>;

            // I am a very nervous Ctrl+S spammer! Remove on production release
            if(keyEvent.key == "s" && keyEvent.ctrlKey) {
                event.preventDefault();
            }
            onKey(keyEvent.key)
        }
        window.addEventListener("keydown", keyEvent,false )
        return ()=>{
            window.addEventListener("keydown", keyEvent,false )
        }
    })
    return <></>


}