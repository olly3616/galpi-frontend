import React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLElement> {
  /** 16px inset. Turn off for cover-art or list-row cards that need flush edges. */
  padded?: boolean;
  /** Applies --shadow-2 (paper lifted a hair). */
  elevated?: boolean;
  as?: keyof JSX.IntrinsicElements;
}

export function Card(props: CardProps): JSX.Element;
