"use client";

import { useQueryClient } from "@tanstack/react-query";
import { getStoryById } from "@/features/stories/api/stories";
import { storyQueryKeys } from "@/features/stories/query-keys";

/**
 * Hook to prefetch a story by its ID, this is used to prefetch a story when the user navigates to a story page
 * so that the story is already in the query cache when the user navigates to the story page
 * and the story is not fetched from the API again, this improves the performance of the application
 */
export function usePrefetchStory() {
  const queryClient = useQueryClient();

  // Function to prefetch a story by its ID
  return (id: number) => {
    // Prefetch the story by its ID, this will fetch the story and store it in the query cache
    return queryClient.prefetchQuery({
      // The query key is used to identify the query in the query cache
      queryKey: storyQueryKeys.detail(id),

      // The query function is used to fetch the story from the API
      queryFn: () => getStoryById(id),

      // The stale time is used to set the stale time in the query cache
      staleTime: 60 * 1000, // 1 minute
    });
  };
};
