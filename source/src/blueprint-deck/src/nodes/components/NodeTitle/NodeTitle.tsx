import React from "react";
import './NodeTitle.css'

export const NodeTitle = ({ label }: { label: string }) => {
  return (
    <h3 className="blueprint-node-title">
      {label}
    </h3>
  );
};
