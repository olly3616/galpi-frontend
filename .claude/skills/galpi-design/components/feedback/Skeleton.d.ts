import React from "react";

export interface SkeletonProps {
  width?: number | string;
  height?: number | string;
  radius?: string;
  style?: React.CSSProperties;
}

export function Skeleton(props: SkeletonProps): JSX.Element;

export interface SkeletonBookGridProps {
  count?: number;
  columns?: number;
}
/** Shelf-grid placeholder for 내 책장 loading. */
export function SkeletonBookGrid(props: SkeletonBookGridProps): JSX.Element;

export interface SkeletonQuoteListProps {
  count?: number;
}
/** Quote-card placeholder for 책 상세 / 피드 loading. */
export function SkeletonQuoteList(props: SkeletonQuoteListProps): JSX.Element;
