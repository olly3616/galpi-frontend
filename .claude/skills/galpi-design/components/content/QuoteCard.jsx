import React from "react";
import { Icon } from "../core/Icon.jsx";

/* The quote is the protagonist: serif, large, generous leading, quote-mark furniture. */
export function QuoteCard({
  character,
  text,
  source,
  author,
  hasNote = false,
  hasAlarm = false,
  likes,
  liked = false,
  by,
  clamp = 3,
  onClick,
  style,
}) {
  return (
    <div
      onClick={onClick}
      style={{
        position: "relative",
        background: "var(--surface-card)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-card)",
        boxShadow: "var(--shadow-2)",
        padding: "var(--pad-card)",
        paddingLeft: 20,
        cursor: onClick ? "pointer" : "default",
        ...style,
      }}
    >
      <span
        style={{
          position: "absolute",
          left: 0,
          top: 16,
          bottom: 16,
          width: 3,
          borderRadius: 3,
          background: "var(--brown-300)",
        }}
      />
      {by && (
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "var(--space-3)" }}>
          <span
            style={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              background: "var(--primary-soft)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--brown-700)",
              fontFamily: "var(--font-ui)",
              fontSize: 12,
              fontWeight: "var(--weight-semibold)",
            }}
          >
            {by.slice(0, 1)}
          </span>
          <span
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: "var(--text-meta-lg)",
              fontWeight: "var(--weight-medium)",
              color: "var(--text-primary)",
            }}
          >
            {by}
          </span>
        </div>
      )}
      {character && (
        <div
          style={{
            fontFamily: "var(--font-ui)",
            fontSize: "var(--text-meta)",
            fontWeight: "var(--weight-semibold)",
            color: "var(--text-secondary)",
            marginBottom: "var(--space-2)",
          }}
        >
          {character}
        </div>
      )}
      <p
        style={{
          margin: 0,
          fontFamily: "var(--font-quote)",
          fontSize: "var(--text-quote)",
          lineHeight: "var(--leading-quote)",
          color: "var(--text-primary)",
          textWrap: "pretty",
          display: clamp ? "-webkit-box" : "block",
          WebkitLineClamp: clamp || undefined,
          WebkitBoxOrient: "vertical",
          overflow: clamp ? "hidden" : undefined,
        }}
      >
        {text}
      </p>
      {(source || author) && (
        <div
          style={{
            marginTop: "var(--space-3)",
            fontFamily: "var(--font-ui)",
            fontSize: "var(--text-meta)",
            color: "var(--text-secondary)",
          }}
        >
          {source}
          {author ? ` · ${author}` : ""}
        </div>
      )}
      {(hasNote || hasAlarm || likes != null) && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "var(--space-3)",
            marginTop: "var(--space-3)",
            paddingTop: "var(--space-3)",
            borderTop: "1px solid var(--border)",
            color: "var(--text-secondary)",
          }}
        >
          {hasAlarm && <Icon name="bell" size={16} color="var(--accent-strong)" />}
          {hasNote && <Icon name="sticky-note" size={16} />}
          {likes != null && (
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                marginLeft: "auto",
                fontFamily: "var(--font-ui)",
                fontSize: "var(--text-meta)",
                color: liked ? "var(--error)" : "var(--text-secondary)",
              }}
            >
              <Icon name="heart" size={16} />
              {likes}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
