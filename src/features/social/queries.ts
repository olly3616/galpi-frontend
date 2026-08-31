import { type InfiniteData, useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { usersKeys } from '@/features/users/queries';
import { nextPageParam, type PageResponse } from '@/lib/api/pagination';

import { followUser, getFeed, likeQuote, searchUsers, unfollowUser, unlikeQuote, type FeedItem } from './api';

export const socialKeys = {
  feed: ['feed'] as const,
  userSearch: (query: string) => ['users', 'search', query] as const,
};

/** 팔로잉 피드, paginated. */
export function useFeed() {
  return useInfiniteQuery({
    queryKey: socialKeys.feed,
    queryFn: ({ pageParam }) => getFeed(pageParam),
    initialPageParam: 0,
    getNextPageParam: nextPageParam,
  });
}

type FeedData = InfiniteData<PageResponse<FeedItem>, number>;

function patchFeed(data: FeedData | undefined, quoteId: number, patch: (it: FeedItem) => FeedItem): FeedData | undefined {
  if (!data) return data;
  return {
    ...data,
    pages: data.pages.map((pg) => ({
      ...pg,
      items: pg.items.map((it) => (it.quoteId === quoteId ? patch(it) : it)),
    })),
  };
}

/** Like/unlike a feed quote with an optimistic update, reconciled from the server response. */
export function useToggleFeedLike() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ quoteId, liked }: { quoteId: number; liked: boolean }) =>
      liked ? unlikeQuote(quoteId) : likeQuote(quoteId),
    onMutate: async ({ quoteId, liked }) => {
      await qc.cancelQueries({ queryKey: socialKeys.feed });
      // Snapshot ONLY the affected item, not the whole feed — reverting the entire cache would
      // clobber a concurrent like on a different quote that resolved in between.
      const prevItem = qc
        .getQueryData<FeedData>(socialKeys.feed)
        ?.pages.flatMap((pg) => pg.items)
        .find((it) => it.quoteId === quoteId);
      qc.setQueryData<FeedData>(socialKeys.feed, (d) =>
        patchFeed(d, quoteId, (it) => ({ ...it, isLiked: !liked, likeCount: it.likeCount + (liked ? -1 : 1) })),
      );
      return { prevItem };
    },
    onError: (_err, { quoteId }, ctx) => {
      if (ctx?.prevItem) qc.setQueryData<FeedData>(socialKeys.feed, (d) => patchFeed(d, quoteId, () => ctx.prevItem!));
    },
    onSuccess: (res, { quoteId }) => {
      qc.setQueryData<FeedData>(socialKeys.feed, (d) =>
        patchFeed(d, quoteId, (it) => ({ ...it, isLiked: res.liked, likeCount: res.likeCount })),
      );
    },
  });
}

/** 사람 찾기 검색, paginated. Disabled until there's a non-empty query. */
export function useSearchUsers(query: string) {
  const q = query.trim();
  return useInfiniteQuery({
    queryKey: socialKeys.userSearch(q),
    queryFn: ({ pageParam }) => searchUsers(q, pageParam),
    initialPageParam: 0,
    getNextPageParam: nextPageParam,
    enabled: q.length > 0,
  });
}

/**
 * Follow/unfollow. The caller manages optimistic per-row state and reverts on error; on success we
 * refresh the caches where `isFollowing`/counts live so other screens (프로필, 팔로워 목록,
 * 내 프로필 카운트) stay consistent.
 */
export function useToggleFollow() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ userId, following }: { userId: number; following: boolean }) =>
      following ? unfollowUser(userId) : followUser(userId),
    onSuccess: (_res, { userId }) => {
      qc.invalidateQueries({ queryKey: usersKeys.me }); // my followingCount changed
      qc.invalidateQueries({ queryKey: usersKeys.profile(userId) }); // their followerCount + isFollowing
      qc.invalidateQueries({ queryKey: usersKeys.followers(userId) });
      qc.invalidateQueries({ queryKey: usersKeys.following(userId) });
    },
  });
}
