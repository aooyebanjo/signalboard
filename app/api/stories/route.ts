import { z } from "zod";

import { getTopStories} from '@/features/stories/api/hacker-news';
import { ApiError } from "@/lib/error";
import { createApiErrorResponse, ApiErrorCode } from "@/lib/api-error";

// Define the query schema for the GET request, to ensure the limit is a valid integer between 1 and 50
const querySchema = z.object({
  limit: z.coerce.number().int().min(1).max(50).default(20),
});

export async function GET(request: Request) {
  try {
    // Parse the query parameters from the request URL, 
    const url = new URL(request.url);

    // Parse the limit parameter from the query string, defaulting to 20 if not provided
    const query = querySchema.safeParse({
      limit: url.searchParams.get('limit') ?? undefined,
    });

    // If the query parameters are invalid, return a 400 response with the error message
    if(!query.success) {
      // If the query parameters are invalid, return a 400 response with the error message
      return createApiErrorResponse(
        'INVALID_QUERY_PARAMETERS' as ApiErrorCode, 
        "The limit integer must be a value between 1 and 50", 
        400,
      );
    }

    // If the query parameters are valid, retrieve the top stories from the Hacker News API, using the limit parameter from the query
    const stories = await getTopStories(query.data.limit);

    // Return the stories as a JSON response
    return Response.json(stories);
  } catch (error) {
    if (error instanceof ApiError) {
      // If the error is an ApiError, log the error and return a 502 response with the error message
      console.error(
        "Hacker News request failed:",
        error
      );
  
      // If the error is an ApiError, log the error and return a 502 response with the error message
      return createApiErrorResponse(
        'STORIES_UNAVAILABLE' as ApiErrorCode, 
        "Unable to retrieve stories at this time.", 
        502,
      );
    }
  
    // If the error is not an ApiError, log the error and return a 500 response with the error message
    console.error(
      "Unexpected error retrieving stories:",
      error
    );
  
    // If the error is not an ApiError, log the error and return a 500 response with the error message
    return createApiErrorResponse(
      'INTERNAL_ERROR' as ApiErrorCode, 
      "An unexpected error occurred while retrieving stories.", 
      500,
    );
  }
}