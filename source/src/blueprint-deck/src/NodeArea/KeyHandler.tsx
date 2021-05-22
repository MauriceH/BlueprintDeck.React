import {useStoreState} from "react-flow-renderer";
import {useCallback, useEffect} from "react";
import React from "react";

export const KeyHandler = () => {
    const selectedElements = useStoreState(store => store.selectedElements)
    useEffect(() => {
        selectedElements?.find(x => x)
    }, [selectedElements])

    const onDeleteKey = useCallback(()=>{

    },[])

    const onKey = useCallback((key:string) => {
        console.log(key);
        if(key == "delete") {
            onDeleteKey();
        }
    },[onDeleteKey])

    return <div tabIndex={0}
                onKeyPress={(event) => {
                    console.log('key', event.key);
                    onKey(event.key);
                }}>&nbsp;</div>


}