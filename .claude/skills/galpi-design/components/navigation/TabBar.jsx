import React from "react";
import { Icon } from "../core/Icon.jsx";

const TABS = [
  { id: "shelf", label: "내 책장", icon: "library" },
  { id: "feed", label: "피드", icon: "users" },
  { id: "profile", label: "프로필", icon: "user" },
];

export function TabBar({ active = "shelf", tabs = TABS, onChange, style }) {
  return (
    <nav
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${tabs.length},1fr)`,
        height: "var(--tabbar-height)",
        background: "var(--surface-card)",
        borderTop: "1px solid var(--border)",
        ...style,
      }}
    >
      {tabs.map((t) => {
        const on = t.id === active;
        return (
          <button
            key={t.id}
            onClick={() => onChange && onChange(t.id)}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 3,
              border: "none",
              background: "transparent",
              cursor: "pointer",
              color: on ? "var(--primary)" : "var(--text-secondary)",
              fontFamily: "var(--font-ui)",
              fontSize: 11,
              fontWeight: on ? "var(--weight-semibold)" : "var(--weight-regular)",
              transition: "var(--transition-control)",
            }}
          >
            <Icon name={t.icon} size={22} />
            {t.label}
          </button>
        );
      })}
    </nav>
  );
}
