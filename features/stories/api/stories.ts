import { z } from "zod";

import type { Story } from "../types/story .ts";
import { ApiError, NotFoundError } from "../../../lib/error";
import { ApiErrorCode } from "@/lib/api-error";
import type { StoriesPage } from "../types/pagination.ts";

/** Zod schema for a single story response. */
const storyResponseSchema = z.object({
  id: z.number(),
  title: z.string(),
  author: z.string(),
  score: z.number(),
  commentCount: z.number(),
  publishedAt: z.string().datetime(),
  url: z.string().optional(),
});

/** Zod schema for an array of story responses. */
const storiesResponseSchema = z.array(
  storyResponseSchema
);

/** Zod schema for a pagination response. */
const paginationSchema = z.object({
  page: z.number(),
  limit: z.number(),
  hasMore: z.boolean(),
});

/** Zod schema for a stories page response. */
const storiesPageResponseSchema = z.object({
  data: storiesResponseSchema,
  pagination: paginationSchema,
});

/** Zod schema for an API error response. */
const apiErrorResponseSchema = z.object({
  error: z.object({
    code: z.string(),
    message: z.string(),
  }),
});

/**
 * Fetches the top stories from the API.
 * @param limit - The number of stories to fetch.
 * @returns An array of stories.
 */
export async function getStories(
  page = 1,
  limit = 10,
): Promise<StoriesPage> {
  // Fetch the stories from the API, using the page and limit to fetch the stories
  const response = await fetch(`/api/stories?page=${page}&limit=${limit}`);

  if(!response.ok) {
    // If the response is not ok, parse the error data and throw an ApiError
    const errorData: unknown = await response.json();

    // Parse the error data and throw an ApiError if the error is an API error
    const parsedError = apiErrorResponseSchema.safeParse(errorData);

    // If the error is an API error, throw an ApiError with the error code and message
    if (parsedError.success) {
      throw new ApiError(
        parsedError.data.error.message,
        response.status,
        parsedError.data.error.code as ApiErrorCode
      );
    }
  
    // If the response is not ok, throw an ApiError with the status code
    throw new ApiError(
      "Failed to fetch stories", 
      response.status
    );
  }

  // Parse the response body as JSON and validate the schema
  const data: unknown = await response.json();

  // If the data is null, throw a NotFoundError
  if(data === null) {
    // If the data is null, throw a NotFoundError
    throw new NotFoundError(
      "No stories found"
    );
  }

  // Parse the response body as JSON and validate the schema
  const storyPage: z.infer<typeof storiesPageResponseSchema> = storiesPageResponseSchema.parse(data);

  // Validate the response body against the schema
  const stories: Story[] = storyPage.data.map((story: z.infer<typeof storyResponseSchema>) => ({
    ...story,
    publishedAt: new Date(story.publishedAt),
  }));

  // Parse the pagination data and create the stories page object
  const pagedStories: StoriesPage = {
    data: stories,
    pagination: storyPage.pagination,
  };

  return pagedStories;
};

/**
 * Fetches a story by its ID.
 * @param id - The ID of the story to fetch.
 * @returns The story.
 */
export async function getStoryById(id: number): Promise<Story> {
  // Fetch the story by id from the API
  const response = await fetch(`/api/stories/${id}`);

  // If the response is not ok, parse the error data and throw an ApiError
  if (!response.ok) {
    // Parse the error data and throw an ApiError if the error is an API error
    const errorData: unknown =
      await response.json();

    // Parse the error data and throw an ApiError if the error is an API error
    const parsedError =
      apiErrorResponseSchema.safeParse(
        errorData
      );

    // If the error is an API error, throw an ApiError with the error code and message
    if (parsedError.success) {
      // If the error is an API error, throw an ApiError with the error code and message
      throw new ApiError(
        parsedError.data.error.message,
        response.status,
        parsedError.data.error.code as ApiErrorCode
      );
    }

    // If the error is not an API error, throw an ApiError with the status code
    throw new ApiError(
      "Failed to fetch story",
      response.status
    );
  }

  // Parse the response body as JSON and validate the schema
  const data: unknown = await response.json();
  
  // If the data is null, throw a NotFoundError
  if (data === null) {
    throw new NotFoundError(
      "Story not found"
    );
  }

  // Parse the response body as JSON and validate the schema
  const parsed: z.infer<typeof storyResponseSchema> = storyResponseSchema.parse(data);
  
  // Create the story object
  const story: Story = {
    ...parsed,
    publishedAt: new Date(parsed.publishedAt),
  };

  return story;
};
