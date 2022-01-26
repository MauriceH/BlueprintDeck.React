import {Blueprint} from "../model/Blueprint";
import {BluePrintRegistry, emptyDesign} from "../model/BluePrintRegistry";
import React, {useCallback, useContext, useEffect, useRef} from "react";
import {Elements} from "react-flow-renderer";
import {NodeData} from "../model/NodeData";
import {createElements} from "../nodes/createElements";
import {createBlueprintDesign} from "../nodes/createBlueprintDesign";
import {NodeTypesContext} from "./NodeTypesContext";

export const useNodeAreaBlueprintDesign = (design: Blueprint | undefined, registry: BluePrintRegistry, setElements: React.Dispatch<React.SetStateAction<Elements<NodeData>>>, elements: Elements<NodeData>, onDesignChanged: ((design: Blueprint) => void) | undefined) => {
    const designRef = useRef(design);
    const nodeTypes = useContext(NodeTypesContext);
    useEffect(() => {
        if (design !== designRef.current) {
            console.log('not equal')
            const newElements = createElements(registry, design ?? emptyDesign,nodeTypes)
            setElements(newElements)
        }
    }, [design,nodeTypes])

    useEffect(() => {
        const newDesign = createBlueprintDesign(elements)
        designRef.current = newDesign;
        if (onDesignChanged != null) onDesignChanged(newDesign)
    }, [elements, onDesignChanged])
};