import React, {useContext} from "react";
import {RegistryContext} from "../../RegistryContext";
import {PoolEntry} from "./PoolEntry";
import {PoolContainer} from "./PoolContainer";


export const ValuePool = () => {
    const registry = useContext(RegistryContext);
    return (
        <PoolContainer>
            {registry.constantValueNodeTypes.map(valueType => {
                return <PoolEntry key={valueType.key} type={'value'} nodeType={valueType.key} title={valueType.title}/>
            })}
        </PoolContainer>);
}