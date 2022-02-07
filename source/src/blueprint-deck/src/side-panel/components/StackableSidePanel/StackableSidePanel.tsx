import React, {PropsWithChildren} from "react";
import './StackableSidePanel.css'

export const StackableSidePanel = ({children}: PropsWithChildren<{}>) => {
    return <div className="blueprint-side-panel">
        {children}
    </div>
}