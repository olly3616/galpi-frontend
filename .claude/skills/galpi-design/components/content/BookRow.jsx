import React from "react";
import { Button } from "../core/Button.jsx";

/* Search-result row in 책 추가. */
export function BookRow({ title, author, cover, added = false, onAdd, style }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "var(--space-3)",
        padding: "var(--space-3) 0",
        borderBottom: "1px solid var(--border)",
        ...style,
      }}
    >
      <span
        style={{
          width: 44,
          height: 66,
          flex: "0 0 auto",
          borderRadius: "var(--radius-cover)",
          border: "1px solid var(--border)",
          background: cover ? `center/cover no-repeat url(${cover})` : "var(--brown-100)",
        }}
      />
      <span style={{ flex: 1, minWidth: 0 }}>
        <span
          style={{
            display: "block",
            fontFamily: "var(--font-ui)",
            fontSize: "var(--text-body-sm)",
            fontWeight: "var(--weight-medium)",
            color: "var(--text-primary)",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {title}
        </span>
        <span
          style={{
            display: "block",
            marginTop: 3,
            fontFamily: "var(--font-ui)",
            fontSize: "var(--text-meta)",
            color: "var(--text-secondary)",
          }}
        >
          {author}
        </span>
      </span>
      {added ? (
        <span
          style={{
            fontFamily: "var(--font-ui)",
            fontSize: "var(--text-meta)",
            color: "var(--text-muted)",
            padding: "0 6px",
          }}
        >
          책장에 있음
        </span>
      ) : (
        <Button variant="secondary" size="sm" onClick={onAdd}>추가</Button>
      )}
    </div>
  );
}
