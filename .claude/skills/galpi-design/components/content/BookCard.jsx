import React from "react";
import { Badge } from "../core/Badge.jsx";

/* Book cover in the shelf grid. MANUAL books with no cover art get a paper-toned
   fallback with the title set like a spine. */
export function BookCard({ title, author, cover, tint, quoteCount = 0, manual = false, onClick, style }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-2)",
        padding: 0,
        border: "none",
        background: "transparent",
        textAlign: "left",
        cursor: "pointer",
        width: "100%",
        ...style,
      }}
    >
      <span
        style={{
          position: "relative",
          display: "block",
          width: "100%",
          aspectRatio: "2 / 3",
          borderRadius: "var(--radius-cover)",
          overflow: "hidden",
          background: cover ? `center/cover no-repeat url(${cover})` : tint || "var(--brown-100)",
          border: "1px solid var(--border)",
          boxShadow: "var(--shadow-2)",
        }}
      >
        {!cover && (
          <span
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: "var(--space-3)",
              borderLeft: "5px solid var(--brown-300)",
              fontFamily: "var(--font-quote)",
              fontSize: 15,
              lineHeight: 1.4,
              color: "var(--brown-700)",
            }}
          >
            {title}
            {author && (
              <span style={{ marginTop: 6, fontSize: 11, fontFamily: "var(--font-ui)", color: "var(--ink-400)" }}>
                {author}
              </span>
            )}
          </span>
        )}
        {manual && (
          <span style={{ position: "absolute", top: 6, left: 6 }}>
            <Badge tone="neutral" style={{ fontSize: 10, padding: "3px 7px" }}>직접 등록</Badge>
          </span>
        )}
      </span>
      <span
        style={{
          fontFamily: "var(--font-ui)",
          fontSize: "var(--text-body-sm)",
          fontWeight: "var(--weight-medium)",
          color: "var(--text-primary)",
          lineHeight: 1.35,
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {title}
      </span>
      <Badge>대사 {quoteCount}개</Badge>
    </button>
  );
}
