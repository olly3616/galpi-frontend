import React from "react";

export interface WeekdayPickerProps {
  /** Selected days from ["월","화","수","목","금","토","일"]. */
  value?: string[];
  onChange?: (days: string[]) => void;
  style?: React.CSSProperties;
}

export function WeekdayPicker(props: WeekdayPickerProps): JSX.Element;
