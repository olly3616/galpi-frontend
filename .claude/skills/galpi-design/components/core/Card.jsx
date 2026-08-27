import React from "react";

export function Card({ padded = true, elevated = true, as = "div", children, style, ...rest }) {
  const Tag = as;
  return (
    <Tag
      style={{
        background: "var(--surface-card)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-card)",
        boxShadow: elevated ? "var(--shadow-2)" : "none",
        padding: padded ? "var(--pad-card)" : 0,
        ...style,
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
