import React from "react";
import { Icon } from "./Icon.jsx";

export function FloatingButton({ icon = "plus", label, onClick, style }) {
  return (
    <button
      aria-label={label}
      onClick={onClick}
      style={{
        position: "absolute",
        right: "var(--gutter-screen)",
        bottom: "calc(var(--tabbar-height) + var(--space-4))",
        width: 56,
        height: 56,
        borderRadius: "50%",
        border: "none",
        background: "var(--primary)",
        color: "var(--text-on-primary)",
        boxShadow: "var(--shadow-3)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        transition: "var(--transition-control)",
        ...style,
      }}
    >
      <Icon name={icon} size={24} />
    </button>
  );
}
