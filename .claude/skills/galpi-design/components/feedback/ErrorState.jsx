import React from "react";
import { Icon } from "../core/Icon.jsx";
import { Button } from "../core/Button.jsx";

export function ErrorState({ title = "잠시 문제가 생겼어요", description, onRetry, retryLabel = "다시 시도", style }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        padding: "var(--space-10) var(--space-6)",
        ...style,
      }}
    >
      <span
        style={{
          width: 56,
          height: 56,
          borderRadius: "50%",
          background: "var(--error-soft)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--error)",
          marginBottom: "var(--space-4)",
        }}
      >
        <Icon name="cloud-off" size={24} />
      </span>
      <p
        style={{
          margin: 0,
          fontFamily: "var(--font-ui)",
          fontSize: "var(--text-body)",
          fontWeight: "var(--weight-medium)",
          color: "var(--text-primary)",
        }}
      >
        {title}
      </p>
      {description && (
        <p
          style={{
            margin: "6px 0 0",
            fontFamily: "var(--font-ui)",
            fontSize: "var(--text-meta-lg)",
            color: "var(--text-secondary)",
          }}
        >
          {description}
        </p>
      )}
      {onRetry && (
        <div style={{ marginTop: "var(--space-5)" }}>
          <Button variant="secondary" size="sm" iconLeft="rotate-cw" onClick={onRetry}>
            {retryLabel}
          </Button>
        </div>
      )}
    </div>
  );
}

/** Inline banner form, for errors above a form. */
export function ErrorBanner({ children, style }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "var(--space-2)",
        background: "var(--error-soft)",
        border: "1px solid rgba(192,73,47,.18)",
        borderRadius: "var(--radius-control)",
        padding: "12px 14px",
        fontFamily: "var(--font-ui)",
        fontSize: "var(--text-meta-lg)",
        color: "var(--error)",
        ...style,
      }}
    >
      <Icon name="circle-alert" size={16} />
      <span>{children}</span>
    </div>
  );
}
