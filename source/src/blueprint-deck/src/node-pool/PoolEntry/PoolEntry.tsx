import React from "react";
import './PoolEntry.css'

export const PoolEntry = ({nodeType,title, onAdd}: { nodeType: string, title: string, onAdd: ()=> any }) => {
    return <div className={"blueprint-node-pool-entry react-flow__node-" + nodeType}
                onClick={onAdd}
                draggable>
        {title}
    </div>;
};