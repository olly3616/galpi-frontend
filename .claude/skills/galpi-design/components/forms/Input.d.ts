import React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  /** Helper line under the field. */
  hint?: string;
  /** Error message — also turns the border red. Overrides hint. */
  error?: string;
  /** Lucide slug shown inside the field (e.g. "search"). */
  iconLeft?: string;
  /** "textarea" for multi-line 메모/대사 entry. */
  as?: "input" | "textarea";
  containerStyle?: React.CSSProperties;
}

export function Input(props: InputProps): JSX.Element;
