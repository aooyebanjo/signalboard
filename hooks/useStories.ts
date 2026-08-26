"use client";

import { useInfiniteQuery } from "@tanstack/react-query";

import { getStories } from "../features/stories/api/stories";

import { storyQueryKeys } from "@/features/stories/query-keys";

/**
 * Hook to fetch stories from the API using infinite pagination.
 * @param limit - The number of stories to fetch, defaults to 10.
 * @returns An object containing the stories and the pagination information.
 */
export function useStories(limit = 10) {
  // Return the infinite query, this is used to fetch the stories from the API using infinite pagination
  return useInfiniteQuery({
    // Set the query key to the story query keys
    queryKey: storyQueryKeys.list(limit),

    // Set the query function to fetch the stories
    queryFn: ({ pageParam = 1 }) => getStories(pageParam, limit),

    // Set the initial page parameter to 1
    initialPageParam: 1,

    // Set the next page parameter to the next page if there are more stories to load
    getNextPageParam: (lastPage) => lastPage.pagination.hasMore ? lastPage.pagination.page + 1 : undefined,
  });
};