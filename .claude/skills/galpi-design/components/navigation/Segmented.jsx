import React from "react";

/* Segmented control — 검색으로 추가 / 직접 등록, 반복 주기 등. */
export function Segmented({ options = [], value, onChange, style }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${options.length},1fr)`,
        gap: 2,
        padding: 3,
        background: "var(--surface-sunken)",
        borderRadius: "var(--radius-control)",
        ...style,
      }}
    >
      {options.map((o) => {
        const id = o.id ?? o;
        const label = o.label ?? o;
        const on = id === value;
        return (
          <button
            key={id}
            onClick={() => onChange && onChange(id)}
            style={{
              height: 38,
              border: "none",
              borderRadius: 10,
              cursor: "pointer",
              background: on ? "var(--surface-card)" : "transparent",
              boxShadow: on ? "var(--shadow-1)" : "none",
              fontFamily: "var(--font-ui)",
              fontSize: "var(--text-body-sm)",
              fontWeight: on ? "var(--weight-semibold)" : "var(--weight-regular)",
              color: on ? "var(--text-primary)" : "var(--text-secondary)",
              transition: "var(--transition-control)",
            }}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
