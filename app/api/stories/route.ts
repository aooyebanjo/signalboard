import { z } from "zod";

import { getTopStories } from "@/features/stories/api/hacker-news";
import type { StoriesPage } from "@/features/stories/types/pagination";
import { createApiErrorResponse } from "@/lib/api-error";
import { ApiError } from "@/lib/error";
import type { Story } from "@/features/stories/types/story .ts";

// Validation schema for the query parameters, this is used to validate the query parameters, this is used to ensure that the query parameters are valid
const querySchema = z.object({
  // The page number, this is used to paginate the stories, this is the page number to fetch
  page: z.coerce
    .number()
    .int()
    .min(1)
    .default(1),

  // The limit of stories to fetch, this is used to limit the number of stories to fetch, this is the number of stories to fetch per page
  limit: z.coerce
    .number()
    .int()
    .min(1)
    .max(50)
    .default(10),
});

// This is the GET request handler for the stories API, this is used to fetch the stories from the API
export async function GET(request: Request) {
  // Get the URL of the request, this is used to get the query parameters from the URL
  const url = new URL(request.url);

  // Parse the query parameters, this is used to parse the query parameters from the URL
  const query = querySchema.safeParse({
    page:
      url.searchParams.get("page") ?? undefined,

    limit:
      url.searchParams.get("limit") ?? undefined,
  });

   if (!query.success) {
    // If the query parameters are not valid, return a 400 Bad Request response
    return createApiErrorResponse(
      "INVALID_QUERY_PARAMETERS",
      "The page must be a positive integer and limit must be an integer between 1 and 50.",
      400
    );
  }

  // Get the page and limit from the query parameters, this is used to get the page and limit from the query parameters
  const { page, limit } = query.data;

  // Calculate the offset, this is used to calculate the offset of the stories to fetch, this is used to paginate the stories
  const offset = (page - 1) * limit;

  try {
    // Fetch the stories from the API, this is used to fetch the stories from the API
    const stories: Story[] = await getTopStories(
      limit + 1,
      offset
    );

    // Get the stories for the current page, this is used to get the stories for the current page
    const pageStories: Story[] = stories.slice(0, limit);

    // Create the response object, this is used to create the response object
    const response: StoriesPage = {
      // Set the data to the stories for the current page
      data: pageStories,

      // Set the pagination to the pagination for the current page
      pagination: {
        // Set the page to the current page
        page,
        // Set the limit to the limit
        limit,
        // Set the hasMore to true if there are more stories to load
        hasMore: stories.length > limit,
      },
    };

    // Return the response object, this is used to return the response object to the client
    return Response.json(response);
  } catch (error) {
    // If the error is an API error, return a 502 Bad Gateway response
    if (error instanceof ApiError) {
      // Log the error, this is used to log the error to the console
      console.error(
        "Hacker News request failed:",
        error
      );

      // Return a 502 Bad Gateway response
      return createApiErrorResponse(
        "STORIES_UNAVAILABLE",
        "Unable to retrieve stories at this time.",
        502
      );
    }

    console.error(
      "Unexpected error retrieving stories:",
      error
    );

    // Return a 500 Internal Server Error response
    return createApiErrorResponse(
      "INTERNAL_ERROR",
      "An unexpected error occurred while retrieving stories.",
      500
    );
  }
}