
import { z } from "zod";

import { createApiErrorResponse} from "@/lib/api-error";
import { ApiError, NotFoundError } from "@/lib/error";

import { getGitHubDeveloperInsights } from "@/features/developers/api/github-insights";
import type { DeveloperInsights } from "@/features/developers/types/developer-insights";

/**
 * The schema for the parameters of the insights route, 
 * it validates that the username is a string, trimmed, between 1 and 50 characters
 */
const paramsSchema = z.object({
  username: z
            .string()
            .trim()
            .min(1)
            .max(50),
});

/**
 * The context for the insights route, it contains the parameters for the route
 */
interface InsightsRouteContext {
  params: Promise<{
    username: string,
  }>;
};

/**
 * The GET handler for the insights route, it validates the parameters,
 * fetches the developer insights, and returns the insights
 * @param request - The request object
 * @param context - The context object
 * @returns The response object
 */
export async function GET(
  request: Request, 
  context: InsightsRouteContext
) {
  try {
    // Get the parameters from the context
    const params = await context.params;

    // Validate the parameters, if they are invalid, return an error, otherwise get the data
    const { success, data } = paramsSchema.safeParse(params);

    // If the parameters are invalid, return an error, otherwise get the data
    if (!success) {
      return createApiErrorResponse(
        "INVALID_DEVELOPER_USERNAME",
        "A valid GitHub developer username is required",
        400,
      );
    }

    // Get the username from the data
    const { username } = data;

    // Fetch the developer insights, if the developer is not found, return a not found error, otherwise return the insights in a JSON response
    const developerInsights: DeveloperInsights = await getGitHubDeveloperInsights(username);

    // Return the developer insights in a JSON response
    return Response.json(developerInsights);
  }
  catch(error) {
    // If the error is a not found error, return a not found error, otherwise return an internal server error, if the error is an API error, return an API error, otherwise return an internal server error
    if (error instanceof NotFoundError) {
      return createApiErrorResponse(
        "DEVELOPER_NOT_FOUND",
        error.message,
        404,
      );
    }

    // If the error is an API error, return an API error, otherwise return an internal server error
    if (error instanceof ApiError) {
      return createApiErrorResponse(
        "INSIGHTS_UNAVAILABLE",
        error.message,
        error.status ?? 500,
      );
    }

    // If the error is not a not found error or an API error, return an internal server error
    return createApiErrorResponse(
      "INTERNAL_ERROR",
      "An unexpected error occurred while fetching the developer insights",
      500,
    );
  }
};
