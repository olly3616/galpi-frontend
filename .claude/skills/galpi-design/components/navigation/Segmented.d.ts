import React from "react";

export interface SegmentedProps {
  /** Strings, or { id, label } objects. Two or three options only. */
  options: (string | { id: string; label: string })[];
  value: string;
  onChange?: (id: string) => void;
  style?: React.CSSProperties;
}

export function Segmented(props: SegmentedProps): JSX.Element;
