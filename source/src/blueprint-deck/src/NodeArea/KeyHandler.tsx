import {isNode, useStoreActions, useStoreState} from "react-flow-renderer";
import React, {KeyboardEvent, useCallback, useEffect, useRef} from "react";
import {useNodeDelete} from "./NodeEventsContext";
import {BlueprintNodeData} from "../model/NodeData";

export const KeyHandler = () => {
    const selectedElements = useStoreState(store => store.selectedElements)

    const setSelectedElements = useStoreActions(acts => acts.setSelectedElements);

    const deleteNode = useNodeDelete();

    const onDeleteKey = useCallback(() => {
        console.log('onDelete',selectedElements)
        const selectedNodes = selectedElements?.filter(x=>isNode(x));
        if(selectedNodes == null || selectedNodes.length <= 0) return;
        const first = selectedNodes[0] as BlueprintNodeData;
        deleteNode(first)
        setSelectedElements([])
    }, [selectedElements, deleteNode])

    const onKey = useCallback((key: string) => {
        if (key == "Delete") {
            onDeleteKey();
            return true
        }
        return false
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
                return;
            }
            if(event.repeat) return;
            const preventDefault = onKey(keyEvent.key)
            if(preventDefault) {
                event.preventDefault()
            }
        }
        window.addEventListener("keydown", keyEvent,false )
        return ()=>{
            window.removeEventListener("keydown", keyEvent,false )
        }
    })
    return <></>


}