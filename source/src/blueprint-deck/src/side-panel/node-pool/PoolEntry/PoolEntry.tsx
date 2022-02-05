import React, {DragEvent, useCallback} from "react";
import {dragNodeType, setDragData} from "../../../NodeArea/SetDragData";
import './PoolEntry.css'

export const PoolEntry = ({type,nodeType,title, onDragStart}: { type: dragNodeType, nodeType: string, title: string, onDragStart: ()=> any }) => {

    const onDragStartInternal = useCallback((event: DragEvent<HTMLDivElement>) => {
        setDragData(event.dataTransfer, type, nodeType, title);
        //onDragStart();
    }, [type, nodeType, title]);

    let className = type == 'node' ?  nodeType : 'constantValueNode';

    return <div className={"blueprint-node-pool-entry react-flow__node-" + className}
                onDragStart={onDragStartInternal}
                draggable>
        {title}
    </div>;
};