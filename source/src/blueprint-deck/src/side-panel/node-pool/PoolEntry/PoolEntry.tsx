import React, {DragEvent, useCallback} from "react";
import {dragNodeType, setDragData} from "../../../NodeArea/SetDragData";
import './PoolEntry.css'

export const PoolEntry = ({type,nodeType,title}: { type: dragNodeType, nodeType: string, title: string }) => {

    const onDragStart = useCallback((event: DragEvent<HTMLDivElement>) => {
        setDragData(event.dataTransfer, type, nodeType, title);
    }, [type, nodeType, title]);

    let className = type == 'node' ?  nodeType : 'constantValueNode';

    return <div className={"blueprint-node-pool-entry react-flow__node-" + className}
                onDragStart={onDragStart}
                draggable>
        {title}
    </div>;
};