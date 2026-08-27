import React from "react";

export interface ScreenHeaderProps {
  title: string;
  /** Renders the back chevron and centers the title (pushed screens). */
  onBack?: () => void;
  /** 26px bold left-aligned title — use on tab root screens (내 책장, 피드, 프로필). */
  large?: boolean;
  /** Trailing controls, usually IconButtons or a text Button. */
  actions?: React.ReactNode;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
  style?: React.CSSProperties;
}

export function ScreenHeader(props: ScreenHeaderProps): JSX.Element;
