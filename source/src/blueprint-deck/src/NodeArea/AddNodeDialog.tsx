import React, {useContext} from "react";
import {DialogBackground} from "../shared/components/DialogBackground";
import './AddNodeDialog.css'
import {PoolContainer} from "../side-panel/node-pool/PoolContainer/PoolContainer";
import {PoolEntry} from "../side-panel/node-pool/PoolEntry/PoolEntry";
import {RegistryContext} from "./RegistryContext";
import {RegistryNode} from "../model/BluePrintRegistry";

export const AddNodeDialog = ({onAdd, onClose}:{onAdd: (node: RegistryNode)=> any; onClose: ()=> any;}) => {
    const registry = useContext(RegistryContext);
    return <DialogBackground onClick={onClose} >
        <div className={"add-node-dialog-container"}>
            <p className={"add-node-dialog-title"}>Nodes hinzufügen</p>
            <PoolContainer>
                {registry.nodeTypes.map(nodeType => {
                    return <PoolEntry key={nodeType.id} nodeType={nodeType.id} title={nodeType.title} onAdd={()=>onAdd(nodeType)}/>
                })}
            </PoolContainer>

        </div>
    </DialogBackground>
}