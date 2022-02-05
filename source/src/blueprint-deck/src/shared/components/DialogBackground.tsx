import React, {PropsWithChildren, ReactNode} from "react";

export const DialogBackground = ({children, onClick}:{ children: ReactNode, onClick: ()=> any;}) => {
    return <div style={{position: 'fixed',width: '100%', height: '100%' , backgroundColor: "#000000A0", zIndex: 1000}} onClick={onClick}>
        {children}
    </div>

}