import React from "react";
import { Icon } from "./Icon.jsx";

const base = {
  fontFamily: "var(--font-ui)",
  fontSize: "var(--text-button)",
  fontWeight: "var(--weight-semibold)",
  lineHeight: 1,
  borderRadius: "var(--radius-control)",
  border: "1px solid transparent",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "var(--space-2)",
  cursor: "pointer",
  whiteSpace: "nowrap",
  transition: "var(--transition-control)",
};

const sizes = {
  sm: { height: 36, padding: "0 14px", fontSize: "var(--text-body-sm)" },
  md: { height: 44, padding: "0 18px" },
  lg: { height: "var(--control-height)", padding: "0 22px" },
};

const variants = {
  primary: { background: "var(--primary)", color: "var(--text-on-primary)" },
  secondary: { background: "transparent", color: "var(--primary)", borderColor: "var(--primary)" },
  text: { background: "transparent", color: "var(--text-link)", padding: "0 4px", height: "auto" },
};

export function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
  loading = false,
  iconLeft,
  iconRight,
  children,
  style,
  ...rest
}) {
  const dim = variant === "text" ? { padding: "0 4px" } : sizes[size] || sizes.md;
  return (
    <button
      disabled={disabled || loading}
      data-variant={variant}
      style={{
        ...base,
        ...dim,
        ...variants[variant],
        width: fullWidth ? "100%" : undefined,
        opacity: disabled ? 0.45 : 1,
        ...(disabled && variant === "primary"
          ? { background: "var(--disabled-bg)", color: "var(--disabled-text)" }
          : null),
        ...(disabled ? { cursor: "not-allowed" } : null),
        ...style,
      }}
      {...rest}
    >
      {loading ? <Spinner /> : iconLeft ? <Icon name={iconLeft} size={18} /> : null}
      {children}
      {iconRight && !loading ? <Icon name={iconRight} size={18} /> : null}
    </button>
  );
}

function Spinner() {
  return (
    <span
      style={{
        width: 16,
        height: 16,
        borderRadius: "50%",
        border: "2px solid currentColor",
        borderTopColor: "transparent",
        opacity: 0.8,
        animation: "galpi-spin 700ms linear infinite",
      }}
    />
  );
}
