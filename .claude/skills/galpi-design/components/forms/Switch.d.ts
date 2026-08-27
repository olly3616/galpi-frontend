import React from "react";

export interface SwitchProps {
  checked?: boolean;
  onChange?: (next: boolean) => void;
  /** Row label to the left of the track. */
  label?: string;
  /** Secondary line under the label. */
  description?: string;
  style?: React.CSSProperties;
}

export function Switch(props: SwitchProps): JSX.Element;
