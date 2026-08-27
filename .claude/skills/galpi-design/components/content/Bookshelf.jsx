import React from "react";
import { Badge } from "../core/Badge.jsx";

/* Books standing on a shelf plank, covers facing out — the 내 책장 display.
   Covers keep the 2:3 ratio and sit on a wooden ledge with a contact shadow. */
export function Bookshelf({ books = [], perRow = 3, onSelect, style }) {
  const rows = [];
  for (let i = 0; i < books.length; i += perRow) rows.push(books.slice(i, i + perRow));
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)", ...style }}>
      {rows.map((row, ri) => (
        <div key={ri}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${perRow},1fr)`,
              gap: "var(--space-4)",
              alignItems: "end",
              padding: "0 4px",
            }}
          >
            {row.map((b) => (
              <ShelfBook key={b.id} book={b} onClick={() => onSelect && onSelect(b.id)} />
            ))}
          </div>
          <Plank />
        </div>
      ))}
    </div>
  );
}

function ShelfBook({ book, onClick }) {
  const [hover, setHover] = React.useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        gap: 6,
        padding: 0,
        border: "none",
        background: "transparent",
        cursor: "pointer",
        textAlign: "left",
        transform: hover ? "translateY(-4px)" : "none",
        transition: "transform var(--duration-base) var(--ease-standard)",
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
          background: book.cover ? `center/cover no-repeat url(${book.cover})` : book.tint || "var(--brown-100)",
          borderTop: "1px solid rgba(255,255,255,.6)",
          borderRight: "1px solid var(--border)",
          borderBottom: "1px solid var(--border-strong)",
          borderLeft: "5px solid var(--brown-300)",
          boxShadow: hover ? "var(--shadow-3)" : "var(--shadow-2)",
        }}
      >
        {!book.cover && (
          <span
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: "10px",
              fontFamily: "var(--font-quote)",
              fontSize: 14,
              lineHeight: 1.4,
              color: "var(--brown-700)",
            }}
          >
            {book.title}
            {book.author && (
              <span style={{ marginTop: 6, fontFamily: "var(--font-ui)", fontSize: 10, color: "var(--ink-400)" }}>
                {book.author}
              </span>
            )}
          </span>
        )}
        {book.quoteCount > 0 && (
          <span style={{ position: "absolute", right: 5, bottom: 5 }}>
            <Badge style={{ fontSize: 10, padding: "3px 7px" }}>{book.quoteCount}</Badge>
          </span>
        )}
      </span>
      <span
        style={{
          fontFamily: "var(--font-ui)",
          fontSize: 12,
          fontWeight: "var(--weight-medium)",
          color: "var(--text-primary)",
          lineHeight: 1.35,
          display: "-webkit-box",
          WebkitLineClamp: 1,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {book.title}
      </span>
    </button>
  );
}

function Plank() {
  return (
    <div style={{ marginTop: 6 }}>
      <div style={{ height: 8, borderRadius: "2px 2px 4px 4px", background: "var(--brown-300)" }} />
      <div style={{ height: 4, margin: "0 6px", borderRadius: "0 0 6px 6px", background: "var(--brown-100)" }} />
    </div>
  );
}
