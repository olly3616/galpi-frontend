import { api } from '@/lib/api/client';
import type { PageResponse } from '@/lib/api/pagination';

/** A quote in the 팔로잉 피드 (always carries its source work). */
export type FeedItem = {
  quoteId: number;
  content: string;
  characterName?: string;
  author: { userId: number; nickname: string };
  work: { title: string; author?: string };
  likeCount: number;
  isLiked: boolean;
};

export type UserSearchItem = { userId: number; nickname: string; bio?: string; isFollowing: boolean };
export type LikeResponse = { liked: boolean; likeCount: number };
export type FollowResponse = { following: boolean };

export async function getFeed(page = 0, size = 20): Promise<PageResponse<FeedItem>> {
  const res = await api.get<PageResponse<FeedItem>>('/api/feed', { params: { page, size } });
  return res.data;
}

export async function likeQuote(quoteId: number): Promise<LikeResponse> {
  const res = await api.post<LikeResponse>(`/api/quotes/${quoteId}/like`);
  return res.data;
}

export async function unlikeQuote(quoteId: number): Promise<LikeResponse> {
  const res = await api.delete<LikeResponse>(`/api/quotes/${quoteId}/like`);
  return res.data;
}

export async function searchUsers(query: string, page = 0, size = 20): Promise<PageResponse<UserSearchItem>> {
  const res = await api.get<PageResponse<UserSearchItem>>('/api/users/search', { params: { query, page, size } });
  return res.data;
}

export async function followUser(userId: number): Promise<FollowResponse> {
  const res = await api.post<FollowResponse>(`/api/users/${userId}/follow`);
  return res.data;
}

export async function unfollowUser(userId: number): Promise<FollowResponse> {
  const res = await api.delete<FollowResponse>(`/api/users/${userId}/follow`);
  return res.data;
}
