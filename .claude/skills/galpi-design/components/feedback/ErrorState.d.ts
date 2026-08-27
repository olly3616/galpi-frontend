import React from "react";

export interface ErrorStateProps {
  title?: string;
  description?: string;
  /** Always provide a way out — no dead ends. */
  onRetry?: () => void;
  retryLabel?: string;
  style?: React.CSSProperties;
}

export function ErrorState(props: ErrorStateProps): JSX.Element;

export interface ErrorBannerProps {
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
/** Inline red banner above a form (e.g. login failure). */
export function ErrorBanner(props: ErrorBannerProps): JSX.Element;
