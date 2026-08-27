import React from "react";

/* Skeleton is the default loading treatment; spinners only inside buttons. */
export function Skeleton({ width = "100%", height = 16, radius = "var(--radius-control)", style }) {
  return (
    <span
      aria-hidden="true"
      style={{
        display: "block",
        width,
        height,
        borderRadius: radius,
        background: "var(--surface-skeleton)",
        animation: "galpi-shimmer 1.4s ease-in-out infinite",
        ...style,
      }}
    />
  );
}

export function SkeletonBookGrid({ count = 6, columns = 3 }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: `repeat(${columns},1fr)`, gap: "var(--space-4)" }}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
          <Skeleton height={undefined} radius="var(--radius-cover)" style={{ aspectRatio: "2 / 3" }} />
          <Skeleton height={12} width="80%" />
          <Skeleton height={18} width={64} radius="var(--radius-badge)" />
        </div>
      ))}
    </div>
  );
}

export function SkeletonQuoteList({ count = 3 }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          style={{
            background: "var(--surface-card)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-card)",
            padding: "var(--pad-card)",
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-2)",
          }}
        >
          <Skeleton height={11} width={56} />
          <Skeleton height={15} />
          <Skeleton height={15} width="88%" />
          <Skeleton height={15} width="62%" />
        </div>
      ))}
    </div>
  );
}
