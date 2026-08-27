import React from "react";
import { Icon } from "../core/Icon.jsx";

/* Empty state — warm and inviting, never a dead end. */
export function EmptyState({ icon = "bookmark", title, description, action, style }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        padding: "var(--space-10) var(--space-6)",
        animation: "galpi-fade-up var(--duration-slow) var(--ease-out) both",
        ...style,
      }}
    >
      <span
        style={{
          width: 72,
          height: 72,
          borderRadius: "50%",
          background: "var(--primary-soft)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--brown-600)",
          marginBottom: "var(--space-5)",
        }}
      >
        <Icon name={icon} size={30} />
      </span>
      <p
        style={{
          margin: 0,
          fontFamily: "var(--font-quote)",
          fontSize: 18,
          lineHeight: "var(--leading-quote)",
          color: "var(--text-primary)",
        }}
      >
        {title}
      </p>
      {description && (
        <p
          style={{
            margin: "var(--space-2) 0 0",
            fontFamily: "var(--font-ui)",
            fontSize: "var(--text-meta-lg)",
            color: "var(--text-secondary)",
            lineHeight: "var(--leading-normal)",
          }}
        >
          {description}
        </p>
      )}
      {action && <div style={{ marginTop: "var(--space-6)" }}>{action}</div>}
    </div>
  );
}
