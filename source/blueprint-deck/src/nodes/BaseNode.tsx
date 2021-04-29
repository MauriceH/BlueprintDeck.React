import {NodeData} from "../NodeData";
import {Handle, Position, Node} from "react-flow-renderer";
import {NodeTitle} from "./NodeTitle";
import {FC} from "react";



export const BaseNode: FC<{node: Node<NodeData>} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>> = (props) =>{
    const {node, children, ...divProps} = props;
    const data = node.data;
    console.log('data', node);
    const inputs = data?.ports?.filter(x=>x.inputOutputType === 0).map((port,idx)=>{
        return <Handle style={{position: 'inherit'}} key={port.key} id={port.key} type={'target'} position={Position.Left}/>
    });
    const outputs = data?.ports?.filter(x=>x.inputOutputType === 1).map(port=>{
        return <Handle style={{position: 'inherit'}} key={port.key} id={port.key} type={'source'} position={Position.Right} />
    });
    return(
        <div {...divProps} style={{display:'flex'}} >
            <div style={{display:'flex', flexFlow: 'column', gap:'10px', padding: '15px 0', marginLeft: '-4px'}}>
                {inputs}
            </div>
            <div style={{flex:1}}>
                <NodeTitle label={data?.label??'Node'} />
                {children}
            </div>
            <div style={{display:'flex', flexFlow: 'column', gap:'10px', padding: '15px 0', marginRight: '-4px'}}>
                {outputs}
            </div>
        </div>
    );
}
