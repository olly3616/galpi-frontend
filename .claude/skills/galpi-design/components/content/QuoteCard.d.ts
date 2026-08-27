import React from "react";

export interface QuoteCardProps {
  /** 등장인물 — small semibold line above the quote. */
  character?: string;
  /** The 대사 itself. Always serif, always the largest text in the card. */
  text: string;
  /** Book title. REQUIRED on feed cards (copyright attribution). */
  source?: string;
  /** Book author, shown after the title. */
  author?: string;
  hasNote?: boolean;
  hasAlarm?: boolean;
  /** Feed-only: like count. Omit inside 책 상세. */
  likes?: number;
  liked?: boolean;
  /** Feed-only: author of the record (nickname). */
  by?: string;
  /** Preview line clamp; pass 0 for the full text on 대사 상세. */
  clamp?: number;
  onClick?: () => void;
  style?: React.CSSProperties;
}

export function QuoteCard(props: QuoteCardProps): JSX.Element;
