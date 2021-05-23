import React, {useContext} from "react";
import {RegistryContext} from "../../NodeArea/RegistryContext";
import {PoolEntry} from "./PoolEntry/PoolEntry";
import {PoolContainer} from "./PoolContainer/PoolContainer";

export const ValuePool = () => {
    const registry = useContext(RegistryContext);
    return (
        <PoolContainer>
            {registry.constantValueNodeTypes.map(valueType => {
                return <PoolEntry key={valueType.key} type={'value'} nodeType={valueType.key} title={valueType.title}/>
            })}
        </PoolContainer>);
}