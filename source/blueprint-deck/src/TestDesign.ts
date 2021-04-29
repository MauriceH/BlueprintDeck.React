import {BluePrintDesign} from "./BluePrintDesign";

export const TestDesign : BluePrintDesign = {
    nodes: [
        {
            location: {
                x: 550,
                y: 300
            },
            title: "TestNode1",
            key: "TestNode1",
            nodeTypeKey: "TestNode",
            data: null
        },
        {
            location: {
                x: 550,
                y: 100
            },
            title: "TestNode2",
            key: "TestNode2",
            nodeTypeKey: "TestNode",
            data: null
        },
        {
            location: {
                x: 0,
                y: 100
            },
            title: "Activate",
            key: "Activate1",
            nodeTypeKey: "Activate",
            data: null
        },
        {
            location: {
                x: 300,
                y: 200
            },
            title: "Delay1",
            key: "Delay1",
            nodeTypeKey: "Delay",
            data: null
        }
    ],
    connections: [
        {
            key: "ActivateToDelay",
            nodeFrom: "Activate1",
            nodePortFrom: "Event",
            nodeTo: "Delay1",
            nodePortTo: "Input"
        },
        {
            key: "DelayToTest1",
            nodeFrom: "Delay1",
            nodePortFrom: "Output",
            nodeTo: "TestNode1",
            nodePortTo: "Trigger"
        },
        {
            key: "DelayToTest2",
            nodeFrom: "Activate1",
            nodePortFrom: "Event",
            nodeTo: "TestNode2",
            nodePortTo: "Trigger"
        },
        {
            key: "DurationToDelay",
            nodeFrom: "Duration1",
            nodePortFrom: "value",
            nodeTo: "Delay1",
            nodePortTo: "Duration"
        }
    ],
    constantValues: [
        {
            value: "15000",
            location: {x:0,y:350},
            title: "RainDuration",
            key: "Duration1",
            nodeTypeKey: "timespan",
            data: null
        },
        {
            value: "15000",
            location: {x:0,y:450},
            title: "Number",
            key: "Int32_1",
            nodeTypeKey: "int32",
            data: null
        }
    ]
}