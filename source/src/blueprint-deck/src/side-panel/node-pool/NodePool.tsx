import React, {useContext} from "react";
import {RegistryContext} from "../../RegistryContext";
import {RegistryNodeType} from "../../BluePrintRegistry";


const NodePoolEntry = (props: { nodeType: RegistryNodeType }) => {
    return <div className={"react-flow__node"}
                style={{
                    position: "inherit",
                    padding: "5px",
                    cursor: "pointer",
                    fontSize: '1em'
                }}>{props.nodeType.title}</div>;
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