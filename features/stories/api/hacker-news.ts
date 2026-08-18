import { z } from "zod";

import { hackerNewsStorySchema, type HackerNewsStory } from "../schemas/hacker-news-story.schema";
import type { Story } from "../types/story .ts";
import { mapHackerNewsStory } from "../utils/map-hacker-news-story";

/** Base URL for the public Hacker News Firebase API. */
const HACKER_NEWS_API_URL =
  "https://hacker-news.firebaseio.com/v0";

/** Validates that the topstories endpoint returns an array of numeric IDs. */
const storyIdsSchema = z.array(z.number());

/**
 * Fetches the ranked list of top story IDs from Hacker News.
 * Throws if the request fails or the response shape is unexpected.
 */
export async function getTopStoryIds(): Promise<number[]> {
  const response = await fetch(
    `${HACKER_NEWS_API_URL}/topstories.json`
  );

  if (!response.ok) {
    throw new Error(
      `Unable to retrieve top stories: ${response.status}`
    );
  }

  const data: unknown = await response.json();

  // Runtime-validate before treating the payload as number[].
  return storyIdsSchema.parse(data);
};

/**
 * Fetches a single HN item by ID, validates it, then maps it to our Story type.
 */
export async function getStory(
  id: number
): Promise<Story> {
  const response = await fetch(
    `${HACKER_NEWS_API_URL}/item/${id}.json`
  );

  if (!response.ok) {
    throw new Error(
      `Unable to retrieve story ${id}: ${response.status}`
    );
  }

  const data: unknown = await response.json();

  // Ensure the HN payload matches the expected item shape.
  const hackerNewsStory: HackerNewsStory =
    hackerNewsStorySchema.parse(data);

  // Normalize HN fields (e.g. by → author, time → Date) into our domain model.
  return mapHackerNewsStory(hackerNewsStory);
};

/**
 * Fetches the top stories from Hacker News.
 * Throws if the request fails or the response shape is unexpected.
 */
export async function getTopStories(
  limit = 20
): Promise<Story[]> {
  // Fetch the top story IDs
  const storyIds: number[] = await getTopStoryIds();

  // Select the top stories
  const selectedIds: number[] = storyIds.slice(0, limit);

  // Fetch the stories
  const storyPromises: Promise<Story>[] = selectedIds.map((id) =>
    getStory(id)
  );

  // Wait for all the stories to be fetched
  const results: PromiseSettledResult<Story>[] = await Promise.allSettled(storyPromises);

  // Wait for all the stories to be fetched
  const stories: Story[] = results.filter(
    (result): result is PromiseFulfilledResult<Story> =>
      result.status === 'fulfilled'
    )
    .map((result) => result.value);

  // Find the failed results, if any
  const failedResults = results.filter(
    (result): result is PromiseRejectedResult =>
      result.status === "rejected"
  );

  // Log the failed results found, if any
  if (failedResults.length > 0) {
    console.error(
      `Failed to retrieve ${failedResults.length} stories`
    );
  }

  // Return the stories
  return stories;
};