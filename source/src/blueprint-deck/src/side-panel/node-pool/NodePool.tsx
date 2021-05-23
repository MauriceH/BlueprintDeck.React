import React, {useContext} from "react";
import {RegistryContext} from "../../NodeArea/RegistryContext";
import {PoolEntry} from "./PoolEntry/PoolEntry";
import {PoolContainer} from "./PoolContainer/PoolContainer";

export const NodePool = () => {
    const registry = useContext(RegistryContext);
    return (
        <PoolContainer>
            {registry.nodeTypes.map(nodeType => {
                return <PoolEntry key={nodeType.key} type={'node'} nodeType={nodeType.key} title={nodeType.title}/>
            })}
        </PoolContainer>);
}