import React, {PropsWithChildren} from "react";
import './PoolContainer.css'

export const PoolContainer = ({...props}: PropsWithChildren<{}>) => {
    return <div className="blueprint-node-pool-container">{props.children}</div>
}