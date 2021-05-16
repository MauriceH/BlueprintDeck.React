import React, {DragEvent, useCallback} from "react";
import {dragNodeType, setDragData} from "./SetDragData";

export const PoolEntry = ({type,nodeType,title}: { type: dragNodeType, nodeType: string, title: string }) => {

    const onDragStart = useCallback((event: DragEvent<HTMLDivElement>) => {
        setDragData(event.dataTransfer, type, nodeType, title);
    }, [type, nodeType, title]);

    let className = type == 'node' ?  nodeType : 'constantValueNode';

    return <div className={"react-flow__node react-flow__node-" + className}
                style={{
                    position: "inherit",
                    padding: "5px",
                    cursor: "pointer",
                    fontSize: '1em'
                }}
                onDragStart={onDragStart}
                draggable>
        {title}
    </div>;
};