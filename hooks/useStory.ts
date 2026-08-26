"use client";

import { useQuery, useQueryClient, QueryKey } from "@tanstack/react-query";
import type { Story } from "@/features/stories/types/story .ts";
import { getStoryById } from "@/features/stories/api/stories";
import { storyQueryKeys } from "@/features/stories/query-keys";
import type { InfiniteData } from "@tanstack/react-query";
import type { StoriesPage } from "@/features/stories/types/pagination";

/**
 * Interface to represent a story in the cache.
 * @property story - The story.
 * @property queryKey - The query key of the story.
 */
interface StoryInCache {
  story: Story;
  queryKey: QueryKey;
};

/**
 * Hook to fetch a story by its ID.
 * @param id - The ID of the story to fetch.
 * @returns The story.
 */
export function useStory(id: number) {
  // Get the query client, this is used to invalidate the query when the story is updated
  const queryClient = useQueryClient();

  // Function to find a story in the list cache
  const findStoryInListCache = (): StoryInCache | undefined => {
    // // Get the story lists from the query cache
    // const storyLists =
    //   queryClient.getQueriesData<Story[]>({
    //     queryKey: storyQueryKeys.lists(),
    //   });

    // // Iterate over the story lists
    // for (const [queryKey, stories] of storyLists) {
    //   const story = stories?.find(
    //     (story) => story.id === id
    //   );

    // Get the story lists from the query cache, this is used to find the story in the list cache
    const storyLists = 
      queryClient.getQueriesData<
        InfiniteData<StoriesPage>
      >({
        queryKey: storyQueryKeys.lists(),
      });

    // Iterate over the story lists, this is used to find the story in the list cache
    for (const [queryKey, stories] of storyLists) {
      const story = stories?.pages.flatMap((page) => page.data).find(
        (story) => story.id === id
      );

      // If the story is found, return it
      if (story) {
        return {
          story,
          queryKey,
        };
      }
    }

    // If the story is not found, return undefined
    return undefined;
  };

  return useQuery({
    // The query key is used to identify the query in the query cache
    queryKey: storyQueryKeys.detail(id),

    // The query function is used to fetch the story from the API
    queryFn: () => getStoryById(id),

    // The initial data is used to set the initial data in the query cache
    initialData: () => {
      // Find the story in the list cache
      const cacheStory: StoryInCache | undefined = findStoryInListCache();

      // If the story is not found, return undefined
      if(!cacheStory) {
        return undefined;
      }

      // If the story is found, return it
      return cacheStory.story;
    },

    // The initial data updated at is used to set the initial data updated at in the query cache
    initialDataUpdatedAt: () => {
      // Find the story in the list cache
      const cacheStory: StoryInCache | undefined = findStoryInListCache();

      // If the story is not found, return undefined
      if(!cacheStory) {
        return undefined;
      }

      // Get the data updated at timestamp from the query cache
      return queryClient.getQueryState(
        cacheStory.queryKey
      )?.dataUpdatedAt;
    },
  });
}
