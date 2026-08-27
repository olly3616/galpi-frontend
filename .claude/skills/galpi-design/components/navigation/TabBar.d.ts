import React from "react";

export interface TabBarProps {
  /** "shelf" | "feed" | "profile" by default. */
  active?: string;
  tabs?: { id: string; label: string; icon: string }[];
  onChange?: (id: string) => void;
  style?: React.CSSProperties;
}

export function TabBar(props: TabBarProps): JSX.Element;
