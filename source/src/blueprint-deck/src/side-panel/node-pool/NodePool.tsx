import React, {useContext} from "react";
import {RegistryContext} from "../../NodeArea/RegistryContext";
import {PoolEntry} from "./PoolEntry/PoolEntry";
import {PoolContainer} from "./PoolContainer/PoolContainer";

export const NodePool = () => {
    const registry = useContext(RegistryContext);
    console.log('NodePool-Registry',registry);
    return (
        <PoolContainer>
            {registry.nodeTypes.map(nodeType => {
                return <PoolEntry key={nodeType.id} type={'node'} nodeType={nodeType.id} title={nodeType.title}/>
            })}
        </PoolContainer>);
}