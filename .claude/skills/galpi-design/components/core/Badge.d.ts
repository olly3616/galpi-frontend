import React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** accent = gold (the default, for "대사 N개"); others for status. */
  tone?: "accent" | "neutral" | "primary" | "success" | "error";
}

export function Badge(props: BadgeProps): JSX.Element;
