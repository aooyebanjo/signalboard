"use client";

import { RefreshCw} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useStories } from "@/hooks/useStories";
import { StoryList } from "@/app/technology/story-list";
import { ApiError } from "@/lib/error";
import { StoryListSkeleton } from "./story-list-skeleton";
import type { Story } from '../types/story .ts';
import type { StoriesPage } from '../types/pagination.ts';

export function TechnologyStories() {
  // Use the useStories hook to fetch the stories, this is used to fetch the stories from the API using infinite pagination
  const {
    data, // The data from the API
    error, // The error from the API
    isPending, // Whether the stories are still loading
    isError, // Whether there was an error fetching the stories
    isRefetching, // Whether the stories are being refetched
    isFetchingNextPage, // Whether the next page is being fetched
    hasNextPage, // Whether there are more stories to load
    fetchNextPage, // The function to fetch the next page
    refetch, // The function to refetch the stories
  } = useStories(10);

  // Get the stories from the data
  const stories: Story[] = data?.pages.flatMap((page: StoriesPage) => page.data) ?? [];

  if(isPending) {
    return (
      // Load the story list skeleton
      <StoryListSkeleton 
      />
    );
  }

  if(isError) {
    return (
      <div className='mt-8 rounded-xl border border-red-200 bg-red-50 p-6'>
        <h2 className='font-semibold text-red-900'>
          Unable to load stories
        </h2>

        <p className='mt-2 text-sm text-red-700'>
          {/* Display the error message */}
          {error instanceof ApiError
            ? error.message
            : "SignalBoard could not retrieve the latest technology stories."
          }
        </p>

        <Button
          type='button'
          variant='secondary'
          className='mt-4'
          onClick={() => refetch()}
        >
          <RefreshCw 
            size={16} 
           />
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div>
      <div className='mt-8 flex justify-end'>
        <Button
          type='button'
          variant='secondary'
          className='mt-4'
          onClick={() => refetch()}
        >
          <RefreshCw
            size={16}
            className={
              isRefetching
                ? "animate-spin"
                : undefined
            }
          />
          {isRefetching ? 'Refetching...' : 'Refetch'}
        </Button>
      </div>

      {/* Display the story list */}
      <StoryList 
        // Display the stories
        stories={stories ?? []} 
      />

      {/* Display the load more button if there are more stories to load */}
      {(stories.length > 0) && (
        <>
          {hasNextPage ? (
            <div className="mt-6 flex justify-center">
              <Button
                type="button"
                variant="secondary"
                disabled={isFetchingNextPage}
                onClick={() => fetchNextPage()}
              >

              <RefreshCw
                size={16}
                className={
                  isFetchingNextPage
                    ? "animate-spin"
                    : undefined
                }
              />

              {isFetchingNextPage
                ? "Loading more..."
                : "Load more"}
              </Button>
            </div>
          ) : (
            <p className="text-sm text-slate-500">
              You&apos;ve reached the end of the list.
            </p>
          )}
        </>
      )}
    </div>
  );
}
