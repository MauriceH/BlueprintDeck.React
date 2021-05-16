import {BluePrintRegistry} from "./BluePrintRegistry";


export const TestRegistry : BluePrintRegistry = {
    nodeTypes: [
        {
            key: "Activate",
            title: "Activate",
            ports: [
                {
                    mandatory: false,
                    inputOutputType: 1,
                    dataMode: 0,
                    key: "Event",
                    title: "OnActivate"
                }
            ]
        },
        {
            key: "TestNode",
            title: "Test node",
            ports: [
                {
                    mandatory: true,
                    inputOutputType: 0,
                    dataMode: 0,
                    key: "Trigger",
                    title: "Trigger"
                }
            ]
        },
        {
            key: "Delay",
            title: "Delay",
            ports: [
                {
                    mandatory: true,
                    inputOutputType: 0,
                    dataMode: 0,
                    key: "Input",
                    title: "Input",
                },
                {
                    mandatory: true,
                    inputOutputType: 0,
                    dataMode: 1,
                    key: "Duration",
                    title: "Duration",
                    typeId: "TimeSpan-cd433911a1f798c91be8f5412f4939b4b0545f2a",
                    defaultValue: "10000"
                },
                {
                    mandatory: false,
                    inputOutputType: 1,
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
    ],
    constantValueNodeTypes: [
        {
            key: "double",
            title: "Double value",
            port: {
                key: "value",
                title: "Value",
                typeId: "Double-b5e8a25b5e551c75505b680d43aeb8b00e72fbbf",
            }
        },
        {
            key: "int32",
            title: "Int32 value",
            port: {
                key: "value",
                title: "Value",
                typeId: "Int32-34201a9f7ecd13ef7ed694c1018ae55b83a9b3da",
            }
        },
        {
            key: "timespan",
            title: "TimeSpan value",
            port: {
                key: "value",
                title: "Value",
                typeId: "TimeSpan-cd433911a1f798c91be8f5412f4939b4b0545f2a",
            }
        },
        {
            key: "string",
            title: "String value",
            port: {
                key: "value",
                title: "Value",
                typeId: "String-6c7f5dbea96fb021d061f17d2a3551ebd23d40fe",
            }
        }
    ]
}