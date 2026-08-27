import React from "react";

export interface FloatingButtonProps {
  /** Lucide slug — "plus" in every current use. */
  icon?: string;
  label: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}

export function FloatingButton(props: FloatingButtonProps): JSX.Element;
