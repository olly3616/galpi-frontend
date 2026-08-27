import React from "react";

export interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Lucide icon slug, e.g. "book-open", "bookmark", "bell", "heart", "plus", "search", "user". */
  name: string;
  /** Pixel box. 20 for inline UI, 24 for tab bar, 16 for meta rows. */
  size?: number;
  /** Overrides currentColor. */
  color?: string;
}

export function Icon(props: IconProps): JSX.Element;
