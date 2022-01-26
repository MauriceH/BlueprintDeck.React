import {BluePrintRegistry} from "../model/BluePrintRegistry";


export const TestRegistry : BluePrintRegistry = {
    nodeTypes: [
        {
            id: "Activate",
            title: "Activate",
            ports: [
                {
                    mandatory: false,
                    direction: 'Output',
                    dataMode: 0,
                    key: "Event",
                    title: "OnActivate"
                }
            ]
        },
        {
            id: "TestNode",
            title: "Test node",
            ports: [
                {
                    mandatory: true,
                    direction: 'Input',
                    dataMode: 0,
                    key: "Trigger",
                    title: "Trigger"
                }
            ]
        },
        {
            id: "Delay",
            title: "Delay",
            ports: [
                {
                    mandatory: true,
                    direction: 'Input',
                    dataMode: 0,
                    key: "Input",
                    title: "Input",
                },
                {
                    mandatory: true,
                    direction: 'Input',
                    dataMode: 1,
                    key: "Duration",
                    title: "Duration",
                    typeId: "TimeSpan-cd433911a1f798c91be8f5412f4939b4b0545f2a",
                    defaultValue: "10000"
                },
                {
                    mandatory: false,
                    direction: 'Output',
                    dataMode: 0,
                    key: "Output",
                    title: "Output",
                }
            ]
        }
    ],
    dataTypes: [
        {
            id: "Double-b5e8a25b5e551c75505b680d43aeb8b00e72fbbf",
            typeName: "System.Double",
            title: "Double"
        },
        {
            id: "Int32-34201a9f7ecd13ef7ed694c1018ae55b83a9b3da",
            typeName: "System.Int32",
            title: "Int32"
        },
        {
            id: "TimeSpan-cd433911a1f798c91be8f5412f4939b4b0545f2a",
            typeName: "System.TimeSpan",
            title: "TimeSpan"
        },
        {
            id: "String-6c7f5dbea96fb021d061f17d2a3551ebd23d40fe",
            typeName: "System.String",
            title: "String"
        }
    ]
}