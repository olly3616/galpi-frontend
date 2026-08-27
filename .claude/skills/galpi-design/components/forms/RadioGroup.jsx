import React from "react";

/* Stacked choice rows — 유형 선택(소설/웹소설), 공개 범위. */
export function RadioGroup({ label, options = [], value, onChange, style }) {
  return (
    <div style={style}>
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
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
        {options.map((o) => {
          const id = o.id ?? o;
          const on = id === value;
          return (
            <button
              key={id}
              onClick={() => onChange && onChange(id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "var(--space-3)",
                minHeight: "var(--control-height)",
                padding: "0 14px",
                textAlign: "left",
                background: "var(--surface-card)",
                border: `1px solid ${on ? "var(--primary)" : "var(--border)"}`,
                borderRadius: "var(--radius-control)",
                cursor: "pointer",
                transition: "var(--transition-control)",
              }}
            >
              <span
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: "50%",
                  border: `1.5px solid ${on ? "var(--primary)" : "var(--border-strong)"}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flex: "0 0 auto",
                }}
              >
                {on && <span style={{ width: 9, height: 9, borderRadius: "50%", background: "var(--primary)" }} />}
              </span>
              <span style={{ flex: 1 }}>
                <span
                  style={{
                    display: "block",
                    fontFamily: "var(--font-ui)",
                    fontSize: "var(--text-body-sm)",
                    fontWeight: on ? "var(--weight-medium)" : "var(--weight-regular)",
                    color: "var(--text-primary)",
                  }}
                >
                  {o.label ?? o}
                </span>
                {o.description && (
                  <span
                    style={{
                      display: "block",
                      marginTop: 2,
                      fontFamily: "var(--font-ui)",
                      fontSize: "var(--text-meta)",
                      color: "var(--text-secondary)",
                    }}
                  >
                    {o.description}
                  </span>
                )}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
