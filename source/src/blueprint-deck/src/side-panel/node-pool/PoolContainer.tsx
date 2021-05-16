import React, {PropsWithChildren} from "react";

export const PoolContainer = ({...props}: PropsWithChildren<{}>) => {
    return <div
        style={{
            flex: '1 1 auto',
            overflow: "auto",
            display: 'flex',
            padding: '15px',
            gap: '15px',
            flexDirection: 'column',
            alignItems: "start"
        }}>{props.children}</div>
}