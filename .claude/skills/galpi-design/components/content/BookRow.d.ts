import React from "react";

export interface BookRowProps {
  title: string;
  author?: string;
  cover?: string;
  /** Already on the shelf — replaces the button with the "책장에 있음" label. */
  added?: boolean;
  onAdd?: () => void;
  style?: React.CSSProperties;
}

export function BookRow(props: BookRowProps): JSX.Element;
