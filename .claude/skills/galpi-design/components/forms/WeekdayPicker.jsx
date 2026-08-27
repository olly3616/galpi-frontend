import React from "react";

const DAYS = ["월", "화", "수", "목", "금", "토", "일"];

export function WeekdayPicker({ value = [], onChange, style }) {
  const toggle = (d) =>
    onChange && onChange(value.includes(d) ? value.filter((x) => x !== d) : [...value, d]);
  return (
    <div style={{ display: "flex", gap: "var(--space-2)", ...style }}>
      {DAYS.map((d) => {
        const on = value.includes(d);
        return (
          <button
            key={d}
            onClick={() => toggle(d)}
            style={{
              flex: 1,
              height: 40,
              borderRadius: "var(--radius-badge)",
              cursor: "pointer",
              background: on ? "var(--primary)" : "var(--surface-card)",
              border: `1px solid ${on ? "var(--primary)" : "var(--border)"}`,
              color: on ? "var(--text-on-primary)" : "var(--text-secondary)",
              fontFamily: "var(--font-ui)",
              fontSize: "var(--text-body-sm)",
              fontWeight: on ? "var(--weight-semibold)" : "var(--weight-regular)",
              transition: "var(--transition-control)",
            }}
          >
            {d}
          </button>
        );
      })}
    </div>
  );
}
