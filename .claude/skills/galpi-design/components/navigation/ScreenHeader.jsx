import React from "react";
import { IconButton } from "../core/IconButton.jsx";

/* Screen header. Large-title mode for tab roots, compact centered mode for pushed screens. */
export function ScreenHeader({ title, onBack, large = false, actions, leading, trailing, style }) {
  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        gap: "var(--space-2)",
        minHeight: 52,
        padding: `${large ? "8px" : "6px"} var(--gutter-screen)`,
        background: "var(--bg-page)",
        ...style,
      }}
    >
      {onBack && <IconButton icon="chevron-left" label="뒤로" onClick={onBack} style={{ marginLeft: -10 }} />}
      {leading}
      <h1
        style={{
          margin: 0,
          flex: 1,
          fontFamily: "var(--font-ui)",
          fontSize: large ? "var(--text-title)" : "17px",
          fontWeight: large ? "var(--weight-bold)" : "var(--weight-semibold)",
          letterSpacing: "var(--tracking-title)",
          textAlign: large || onBack === undefined ? "left" : "center",
          color: "var(--text-primary)",
        }}
      >
        {title}
      </h1>
      {actions ? (
        <span style={{ display: "flex", alignItems: "center", gap: 2 }}>{actions}</span>
      ) : (
        trailing
      )}
    </header>
  );
}
