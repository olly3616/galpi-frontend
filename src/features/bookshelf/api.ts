import { api } from '@/lib/api/client';
import type { PageResponse } from '@/lib/api/pagination';

/** A book from 도서 검색 (Kakao proxy). */
export type BookSearchItem = {
  title: string;
  author?: string;
  publisher?: string;
  coverUrl?: string | null;
  isbn?: string;
};

/** A book on my shelf, with its quote count. */
export type BookshelfItem = {
  workId: number;
  title: string;
  author?: string;
  coverUrl?: string | null;
  quoteCount: number;
};

export type AddBookInput = {
  source: 'API' | 'MANUAL';
  title: string;
  type: 'NOVEL' | 'WEBNOVEL';
  author?: string;
  publisher?: string;
  coverUrl?: string;
  isbn?: string;
};

export async function searchBooks(query: string, page = 0, size = 20): Promise<PageResponse<BookSearchItem>> {
  const res = await api.get<PageResponse<BookSearchItem>>('/api/books/search', { params: { query, page, size } });
  return res.data;
}

export async function getMyShelf(page = 0, size = 20): Promise<PageResponse<BookshelfItem>> {
  const res = await api.get<PageResponse<BookshelfItem>>('/api/bookshelf/me', { params: { page, size } });
  return res.data;
}

export async function addBook(input: AddBookInput): Promise<{ workId: number }> {
  const res = await api.post<{ workId: number }>('/api/bookshelf', input);
  return res.data;
}

export async function removeBook(workId: number): Promise<void> {
  await api.delete(`/api/bookshelf/${workId}`);
}
