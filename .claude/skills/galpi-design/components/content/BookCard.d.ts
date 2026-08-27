import React from "react";

export interface BookCardProps {
  title: string;
  author?: string;
  /** Cover image URL. Omit for MANUAL/웹소설 books — a typographic fallback cover is drawn. */
  cover?: string;
  /** Fallback-cover background when there is no `cover` — use a paper/brown token, not a saturated colour. */
  tint?: string;
  /** Rendered as the gold "대사 N개" badge. */
  quoteCount?: number;
  /** Shows the 직접 등록 chip on the cover. */
  manual?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
}

export function BookCard(props: BookCardProps): JSX.Element;
