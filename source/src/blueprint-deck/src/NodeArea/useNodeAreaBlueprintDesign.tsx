import {BluePrintDesign} from "../model/BluePrintDesign";
import {BluePrintRegistry, emptyDesign} from "../model/BluePrintRegistry";
import React, {useCallback, useEffect, useRef} from "react";
import {Elements} from "react-flow-renderer";
import {NodeData} from "../model/NodeData";
import {createElements} from "../nodes/createElements";
import {createDesign} from "../nodes/createDesign";

export const useNodeAreaBlueprintDesign = (design: BluePrintDesign | undefined, registry: BluePrintRegistry, setElements: React.Dispatch<React.SetStateAction<Elements<NodeData>>>, elements: Elements<NodeData>, onDesignChanged: ((design: BluePrintDesign) => void) | undefined) => {
    const designRef = useRef(design);
    useEffect(() => {
        if (design !== designRef.current) {
            console.log('not equal')
            const newElements = createElements(registry, design ?? emptyDesign)
            setElements(newElements)
        }
    }, [design])

    useEffect(() => {
        const newDesign = createDesign(elements)
        designRef.current = newDesign;
        if (onDesignChanged != null) onDesignChanged(newDesign)
    }, [elements, onDesignChanged])
};