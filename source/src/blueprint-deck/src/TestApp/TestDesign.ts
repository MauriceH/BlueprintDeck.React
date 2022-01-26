import {Blueprint} from "../model/Blueprint";

export const TestDesign : Blueprint = {
    nodes: [
        {
            location: {
                x: 0,
                y: 100
            },
            title: "Activate",
            id: "Activate1",
            nodeTypeKey: "Activate",
            data: null
        },
        {
            location: {
                x: 300,
                y: 200
            },
            title: "Delay1",
            id: "Delay1",
            nodeTypeKey: "Delay",
            data: null
        }
    ],
    connections: [
        {
            id: "ActivateToDelay",
            nodeFrom: "Activate1",
            nodePortFrom: "Event",
            nodeTo: "Delay1",
            nodePortTo: "Input"
        },

    ]
}