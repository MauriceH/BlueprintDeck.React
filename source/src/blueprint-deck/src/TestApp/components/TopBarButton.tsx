import React, {PropsWithChildren} from "react";

interface ClickableButtonProps {
    onClick: ()=>void;
}

export const TopBarButton = ({children,onClick}: PropsWithChildren<ClickableButtonProps>) => {

    return <div style={{
        minWidth: 38,
        minHeight: 34,
        backgroundColor: '#ffffff33',
        border: 0,
        borderRadius: '0.2rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: "center",
        cursor: 'pointer',
        boxShadow: '0 0 0.5rem rgba(0, 0, 0, 0.2)',
        padding: '0px 18px'
    }} onClick={onClick}>{children}</div>
}

interface ActivateButtonProps extends ClickableButtonProps {
    onClick: ()=>void;
    active: boolean
}

export const TopBarActiveButton = ({children, onClick, active }: PropsWithChildren<ActivateButtonProps>) => {

    var activeStyle = active ?  {backgroundColor: '#ffffff88', color:'#000'} : {}

    return <div style={{
        minWidth: 36,
        minHeight: 34,
        backgroundColor: '#ffffff33',
        border: 0,
        borderRadius: '0.2rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: "center",
        cursor: 'pointer',
        color: '#FFF',
        userSelect: 'none',
        padding: '0px 8px',
        boxShadow: '0 0 0.5rem rgba(0, 0, 0, 0.2)',
        ...activeStyle
    }} onClick={onClick}>{children}</div>
}