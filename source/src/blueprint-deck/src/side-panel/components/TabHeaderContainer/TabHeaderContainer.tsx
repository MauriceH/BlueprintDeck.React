import React, {PropsWithChildren} from "react";
import './TabHeaderContainer.css'

export const TabHeaderContainer = ({children}: PropsWithChildren<{}>) => {
    return <div className="tab-header-container">{children}</div>
}