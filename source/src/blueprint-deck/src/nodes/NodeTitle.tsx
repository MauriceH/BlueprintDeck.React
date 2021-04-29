import React from "react";

export const NodeTitle = ({ label }: { label: string }) => {
  return (
    <h3 style={{ marginTop: "3px", fontWeight: "normal", color: "#111" }}>
      {label}
    </h3>
  );
};
