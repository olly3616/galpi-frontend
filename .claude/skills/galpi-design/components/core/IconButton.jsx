import React from "react";
import { Icon } from "./Icon.jsx";

export function IconButton({ icon, size = 40, label, active = false, style, ...rest }) {
  return (
    <button
      aria-label={label}
      style={{
        width: size,
        height: size,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        background: "transparent",
        border: "none",
        borderRadius: "var(--radius-control)",
        color: active ? "var(--primary)" : "var(--text-secondary)",
        cursor: "pointer",
        transition: "var(--transition-control)",
        ...style,
      }}
      {...rest}
    >
      <Icon name={icon} size={Math.round(size * 0.5)} />
    </button>
  );
}
