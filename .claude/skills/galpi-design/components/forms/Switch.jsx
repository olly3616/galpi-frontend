import React from "react";

export function Switch({ checked = false, onChange, label, description, style }) {
  return (
    <label
      style={{
        display: "flex",
        alignItems: "center",
        gap: "var(--space-3)",
        cursor: "pointer",
        ...style,
      }}
    >
      {(label || description) && (
        <span style={{ flex: 1 }}>
          {label && (
            <span
              style={{
                display: "block",
                fontFamily: "var(--font-ui)",
                fontSize: "var(--text-body)",
                color: "var(--text-primary)",
              }}
            >
              {label}
            </span>
          )}
          {description && (
            <span
              style={{
                display: "block",
                marginTop: 2,
                fontFamily: "var(--font-ui)",
                fontSize: "var(--text-meta)",
                color: "var(--text-secondary)",
              }}
            >
              {description}
            </span>
          )}
        </span>
      )}
      <span
        onClick={() => onChange && onChange(!checked)}
        style={{
          position: "relative",
          width: 46,
          height: 28,
          flex: "0 0 auto",
          borderRadius: 999,
          background: checked ? "var(--primary)" : "var(--border-strong)",
          transition: "background-color var(--duration-base) var(--ease-standard)",
        }}
      >
        <span
          style={{
            position: "absolute",
            top: 3,
            left: checked ? 21 : 3,
            width: 22,
            height: 22,
            borderRadius: "50%",
            background: "#fff",
            boxShadow: "var(--shadow-1)",
            transition: "left var(--duration-base) var(--ease-standard)",
          }}
        />
      </span>
    </label>
  );
}
