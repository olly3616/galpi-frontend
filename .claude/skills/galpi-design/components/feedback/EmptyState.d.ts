import React from "react";

export interface EmptyStateProps {
  /** Lucide slug in the soft brown medallion. */
  icon?: string;
  /** The invitation, set in serif. e.g. "첫 책을 책장에 꽂아보세요" */
  title: string;
  description?: string;
  /** Usually a single <Button>. */
  action?: React.ReactNode;
  style?: React.CSSProperties;
}

export function EmptyState(props: EmptyStateProps): JSX.Element;
