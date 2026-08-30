import { api } from '@/lib/api/client';
import type { PageResponse } from '@/lib/api/pagination';

/** The signed-in user's own profile (GET /api/users/me). */
export type MyProfile = {
  userId: number;
  nickname: string;
  bio?: string;
  profileImageUrl?: string | null;
  followerCount: number;
  followingCount: number;
  bookCount: number;
  quoteCount: number;
};

/** All fields optional; only sent fields change. Empty `bio` clears it. */
export type UpdateMeInput = { nickname?: string; bio?: string; profileImageUrl?: string | null };

export type ProfileQuote = {
  quoteId: number;
  content: string;
  characterName?: string;
  work: { title: string; author?: string };
};

/** Another user's public profile (GET /api/users/{id}). */
export type UserProfile = {
  userId: number;
  nickname: string;
  bio?: string;
  profileImageUrl?: string | null;
  followerCount: number;
  followingCount: number;
  isFollowing: boolean;
  quotes: PageResponse<ProfileQuote>;
};

/** A person in search / followers / following lists. */
export type PersonItem = {
  userId: number;
  nickname: string;
  bio?: string;
  profileImageUrl?: string | null;
  isFollowing: boolean;
};

export async function getMe(): Promise<MyProfile> {
  const res = await api.get<MyProfile>('/api/users/me');
  return res.data;
}

export async function updateMe(input: UpdateMeInput): Promise<MyProfile> {
  const res = await api.patch<MyProfile>('/api/users/me', input);
  return res.data;
}

export async function getUserProfile(userId: number, page = 0, size = 20): Promise<UserProfile> {
  const res = await api.get<UserProfile>(`/api/users/${userId}`, { params: { page, size } });
  return res.data;
}

export async function getFollowers(userId: number, page = 0, size = 20): Promise<PageResponse<PersonItem>> {
  const res = await api.get<PageResponse<PersonItem>>(`/api/users/${userId}/followers`, { params: { page, size } });
  return res.data;
}

export async function getFollowing(userId: number, page = 0, size = 20): Promise<PageResponse<PersonItem>> {
  const res = await api.get<PageResponse<PersonItem>>(`/api/users/${userId}/following`, { params: { page, size } });
  return res.data;
}
