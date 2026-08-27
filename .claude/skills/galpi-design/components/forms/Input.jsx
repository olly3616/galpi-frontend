import React from "react";

export function Input({
  label,
  hint,
  error,
  iconLeft,
  as = "input",
  style,
  containerStyle,
  ...rest
}) {
  const [focused, setFocused] = React.useState(false);
  const Tag = as;
  const borderColor = error ? "var(--error)" : focused ? "var(--border-focus)" : "var(--border)";
  return (
    <label style={{ display: "block", ...containerStyle }}>
      {label && (
        <span
          style={{
            display: "block",
            fontFamily: "var(--font-ui)",
            fontSize: "var(--text-meta-lg)",
            fontWeight: "var(--weight-medium)",
            color: "var(--text-primary)",
            marginBottom: "var(--space-2)",
          }}
        >
          {label}
        </span>
      )}
      <span
        style={{
          display: "flex",
          alignItems: as === "textarea" ? "flex-start" : "center",
          gap: "var(--space-2)",
          background: "var(--surface-card)",
          border: `1px solid ${borderColor}`,
          boxShadow: focused && !error ? "var(--shadow-focus)" : "none",
          borderRadius: "var(--radius-control)",
          padding: as === "textarea" ? "12px 14px" : "0 14px",
          minHeight: "var(--control-height)",
          transition: "var(--transition-control)",
        }}
      >
        {iconLeft && <IconSlot name={iconLeft} />}
        <Tag
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            flex: 1,
            border: "none",
            outline: "none",
            background: "transparent",
            fontFamily: "var(--font-ui)",
            fontSize: "var(--text-body)",
            color: "var(--text-primary)",
            lineHeight: "var(--leading-normal)",
            padding: as === "textarea" ? 0 : "13px 0",
            resize: as === "textarea" ? "vertical" : undefined,
            ...style,
          }}
          {...rest}
        />
      </span>
      {(error || hint) && (
        <span
          style={{
            display: "block",
            marginTop: 6,
            fontFamily: "var(--font-ui)",
            fontSize: "var(--text-meta)",
            color: error ? "var(--error)" : "var(--text-secondary)",
          }}
        >
          {error || hint}
        </span>
      )}
    </label>
  );
}

function IconSlot({ name }) {
  const url = `https://cdn.jsdelivr.net/npm/lucide-static@0.469.0/icons/${name}.svg`;
  return (
    <span
      aria-hidden="true"
      style={{
        width: 18,
        height: 18,
        flex: "0 0 auto",
        backgroundColor: "var(--text-secondary)",
        WebkitMaskImage: `url(${url})`,
        maskImage: `url(${url})`,
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
      }}
    />
  );
}
