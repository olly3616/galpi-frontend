import React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** primary = filled brown; secondary = outlined; text = inline link. */
  variant?: "primary" | "secondary" | "text";
  size?: "sm" | "md" | "lg";
  /** Full-width is the default shape for primary actions on mobile screens. */
  fullWidth?: boolean;
  /** Swaps the leading icon for an inline spinner and blocks input. */
  loading?: boolean;
  /** Lucide slug rendered before the label. */
  iconLeft?: string;
  /** Lucide slug rendered after the label. */
  iconRight?: string;
}

export function Button(props: ButtonProps): JSX.Element;
