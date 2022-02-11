import React from "react";
import {NodePropertyEditors, PropertyTypeEditors} from "../../model/BluePrintRegistry";

export const PropertyTypeEditorsContext = React.createContext<PropertyTypeEditors | undefined>({});

export const NodePropertyEditorsContext = React.createContext<NodePropertyEditors | undefined>({});