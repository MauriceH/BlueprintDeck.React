
export type dragNodeType = 'node' | 'value'

export const setDragData = (transfer: DataTransfer, type: dragNodeType, nodeType: string, title: string) => {
    transfer.setData('application/reactflow-type', type);
    transfer.setData('application/reactflow-nodetype', nodeType);
    transfer.setData('application/reactflow-title', title);
    transfer.effectAllowed = 'move';
}


export const getDragData = (transfer: DataTransfer) => {
    return {
        type: transfer.getData('application/reactflow-type'),
        nodeType: transfer.getData('application/reactflow-nodetype'),
        title: transfer.getData('application/reactflow-title'),
    }
}

