import React, {useCallback, useContext, DragEvent} from "react";
import {RegistryContext} from "../../RegistryContext";
import {RegistryNodeType} from "../../BluePrintRegistry";


const NodePoolEntry = ({nodeType,...props}: { nodeType: RegistryNodeType }) => {

    const onDragStart = useCallback((event: DragEvent<HTMLDivElement>) => {
        event.dataTransfer.setData('application/reactflow', nodeType.key);
        event.dataTransfer.effectAllowed = 'move';
    },[nodeType]);

    return <div className={"react-flow__node"}
                style={{
                    position: "inherit",
                    padding: "5px",
                    cursor: "pointer",
                    fontSize: '1em'
                }}
                onDragStart={onDragStart}
                draggable>
        {nodeType.title}
    </div>;
};

export const NodePool = () => {
    const registry = useContext(RegistryContext);
    return <div
        style={{
            flex: '1 1 auto',
            overflow: "auto",
            display: 'flex',
            padding: '15px',
            gap: '15px',
            flexDirection: 'column',
            alignItems: "start"
        }}>
        {registry.nodeTypes.map(nodeType => {
            return <NodePoolEntry key={nodeType.key} nodeType={nodeType}/>
        })}
    </div>
}