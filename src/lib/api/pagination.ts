/** Standard list envelope from the API — no total count, just next-page existence. */
export type PageResponse<T> = {
  items: T[];
  page: number;
  hasNext: boolean;
};

/** getNextPageParam for useInfiniteQuery: next page index, or undefined when exhausted. */
export function nextPageParam<T>(last: PageResponse<T>): number | undefined {
  return last.hasNext ? last.page + 1 : undefined;
}
