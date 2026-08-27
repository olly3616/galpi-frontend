import React from "react";

const LUCIDE = "https://cdn.jsdelivr.net/npm/lucide-static@0.469.0/icons/";

/* Thin-line outline glyphs from Lucide, loaded as CSS masks so they inherit currentColor. */
export function Icon({ name, size = 20, strokeWidth, color, style, ...rest }) {
  const url = `${LUCIDE}${name}.svg`;
  return (
    <span
      aria-hidden="true"
      data-icon={name}
      style={{
        display: "inline-block",
        width: size,
        height: size,
        flex: "0 0 auto",
        backgroundColor: color || "currentColor",
        WebkitMaskImage: `url(${url})`,
        maskImage: `url(${url})`,
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
        WebkitMaskSize: "contain",
        maskSize: "contain",
        ...style,
      }}
      {...rest}
    />
  );
}
