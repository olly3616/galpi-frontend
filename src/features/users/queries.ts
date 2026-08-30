import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { nextPageParam } from '@/lib/api/pagination';

import { getFollowers, getFollowing, getMe, getUserProfile, updateMe, type UpdateMeInput } from './api';

export const usersKeys = {
  me: ['users', 'me'] as const,
  profile: (userId: number) => ['users', userId] as const,
  followers: (userId: number) => ['users', userId, 'followers'] as const,
  following: (userId: number) => ['users', userId, 'following'] as const,
};

/** The signed-in user's own profile + counts. */
export function useMe() {
  return useQuery({ queryKey: usersKeys.me, queryFn: getMe });
}

export function useUpdateMe() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: UpdateMeInput) => updateMe(input),
    onSuccess: (data) => qc.setQueryData(usersKeys.me, data),
  });
}

export function useUserProfile(userId: number) {
  return useQuery({
    queryKey: usersKeys.profile(userId),
    queryFn: () => getUserProfile(userId),
    enabled: Number.isFinite(userId),
  });
}

export function useFollowers(userId: number) {
  return useInfiniteQuery({
    queryKey: usersKeys.followers(userId),
    queryFn: ({ pageParam }) => getFollowers(userId, pageParam),
    initialPageParam: 0,
    getNextPageParam: nextPageParam,
    enabled: Number.isFinite(userId),
  });
}

export function useFollowing(userId: number) {
  return useInfiniteQuery({
    queryKey: usersKeys.following(userId),
    queryFn: ({ pageParam }) => getFollowing(userId, pageParam),
    initialPageParam: 0,
    getNextPageParam: nextPageParam,
    enabled: Number.isFinite(userId),
  });
}
