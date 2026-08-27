import React from "react";

export interface RadioGroupProps {
  label?: string;
  /** Strings or { id, label, description }. */
  options: (string | { id: string; label: string; description?: string })[];
  value: string;
  onChange?: (id: string) => void;
  style?: React.CSSProperties;
}

export function RadioGroup(props: RadioGroupProps): JSX.Element;
