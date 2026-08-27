import React from "react";

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Lucide slug. */
  icon: string;
  /** Tap target box in px — never below 40 on mobile. */
  size?: number;
  /** Required accessible name. */
  label: string;
  /** Tints the glyph with --primary (e.g. notification set, liked). */
  active?: boolean;
}

export function IconButton(props: IconButtonProps): JSX.Element;
