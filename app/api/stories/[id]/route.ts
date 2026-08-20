import { z } from "zod";
import { getStory } from "@/features/stories/api/hacker-news";
import { ApiError, NotFoundError } from "@/lib/error";
import { createApiErrorResponse, ApiErrorCode } from "@/lib/api-error";

const paramsSchema = z.object({
  id: z.coerce.number().int().positive(),
});

interface StoryRouteContext {
  params: Promise<{
    id: number
  }>;
};

export async function GET(request: Request, context: StoryRouteContext) {
  // Parse the story ID from the request URL
  const params = await context.params;

  // Parse the story ID from the request URL
  const result = paramsSchema.safeParse(params);

  try {
    // If the story ID is invalid, return a 400 response with the error message
    if(!result.success) {
      return createApiErrorResponse(
        'INVALID_STORY_ID' as ApiErrorCode, 
        "The story ID must be a positive integer", 
        400,
      );
    }

    // If the story ID is valid, retrieve the story from the Hacker News API
    const story = await getStory(result.data.id);

    // Return the story as a JSON response
    return Response.json(story);
  }catch(error) {
    if (error instanceof NotFoundError) {
      // If the error is a NotFoundError, log the error and return a 404 response with the error message
      return createApiErrorResponse(
        'STORY_NOT_FOUND' as ApiErrorCode, 
        "The requested story could not be found.", 
        404,
      );
    }
  
    if (error instanceof ApiError) {
      // If the error is an ApiError, log the error and return a 502 response with the error message
      console.error(
        `Hacker News request failed for story ${result.data?.id}:`,
        error
      );
  
      return createApiErrorResponse(
        'STORY_UNAVAILABLE' as ApiErrorCode, 
        "The requested story is temporarily unavailable.", 
        502,
      );
    }
  
    // If the error is not an ApiError, log the error and return a 500 response with the error message
    console.error(
      `Unexpected error retrieving story ${result.data?.id}:`,
      error
    );
  
    return createApiErrorResponse(
      'INTERNAL_ERROR' as ApiErrorCode, 
      "An unexpected error occurred while retrieving the story.", 
      500,
    );
  }
};