import React from "react";

const tones = {
  accent: { background: "var(--accent-soft)", color: "var(--accent-strong)" },
  neutral: { background: "var(--surface-sunken)", color: "var(--text-secondary)" },
  primary: { background: "var(--primary-soft)", color: "var(--primary-hover)" },
  success: { background: "var(--success-soft)", color: "var(--success)" },
  error: { background: "var(--error-soft)", color: "var(--error)" },
};

export function Badge({ tone = "accent", children, style, ...rest }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        fontFamily: "var(--font-ui)",
        fontSize: "var(--text-meta)",
        fontWeight: "var(--weight-semibold)",
        lineHeight: 1,
        padding: "5px 9px",
        borderRadius: "var(--radius-badge)",
        ...tones[tone],
        ...style,
      }}
      {...rest}
    >
      {children}
    </span>
  );
}
