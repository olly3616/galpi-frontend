import React from "react";

export interface ShelfBookItem {
  id: string;
  title: string;
  author?: string;
  /** Cover image URL from the books API. */
  cover?: string;
  /** Fallback-cover tint when there is no cover image. Use a paper/brown token. */
  tint?: string;
  /** Shown as a small gold count chip on the cover. */
  quoteCount?: number;
}

export interface BookshelfProps {
  books: ShelfBookItem[];
  /** Books per plank. 3 on a 390px phone screen. */
  perRow?: number;
  onSelect?: (id: string) => void;
  style?: React.CSSProperties;
}

export function Bookshelf(props: BookshelfProps): JSX.Element;
