import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { nextPageParam } from '@/lib/api/pagination';

import { addBook, getMyShelf, removeBook, searchBooks } from './api';

export const bookshelfKeys = {
  me: ['bookshelf', 'me'] as const,
  search: (query: string) => ['books', 'search', query] as const,
};

/** My shelf, paginated (infinite scroll, newest first). */
export function useMyShelf() {
  return useInfiniteQuery({
    queryKey: bookshelfKeys.me,
    queryFn: ({ pageParam }) => getMyShelf(pageParam),
    initialPageParam: 0,
    getNextPageParam: nextPageParam,
  });
}

/** 도서 검색, paginated. Disabled until there's a non-empty query. */
export function useSearchBooks(query: string) {
  const q = query.trim();
  return useInfiniteQuery({
    queryKey: bookshelfKeys.search(q),
    queryFn: ({ pageParam }) => searchBooks(q, pageParam),
    initialPageParam: 0,
    getNextPageParam: nextPageParam,
    enabled: q.length > 0,
  });
}

/** Add a book; refresh the shelf on success. */
export function useAddBook() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: addBook,
    onSuccess: () => qc.invalidateQueries({ queryKey: bookshelfKeys.me }),
  });
}

/** Remove a book from the shelf; refresh on success. */
export function useRemoveBook() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: removeBook,
    onSuccess: () => qc.invalidateQueries({ queryKey: bookshelfKeys.me }),
  });
}
