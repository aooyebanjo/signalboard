import { z } from 'zod';

import { getGithubDeveloper } from '@/features/developers/api/github';
import { createApiErrorResponse, ApiErrorCode } from '@/lib/api-error';
import { ApiError, NotFoundError } from '@/lib/error';

/**
 * The schema for the query parameters.
 */
const paramsSchema = z.object({
  username: z
            .string()
            .trim()
            .min(1)
            .max(39),
});

/**
 * The context for the developer route.
 */
interface DeveloperRouteContext {
  params: Promise<{
      username: string
  }>;
}

/**
 * The GET handler for the developer route.
 */
export async function GET(
  _request: Request, 
  context: DeveloperRouteContext,
) {
  // Get the query parameters from the context.
  const params = await context.params;

  // Parse the query parameters.
  const result = paramsSchema.safeParse(params);

  if (!result.success) {
    // Return a bad request error if the query parameters are invalid.
    return createApiErrorResponse(
      'INVALID_QUERY_PARAMETERS',
      'The requested developer could not be found',
      400, 
    )
  }

  // Get the username from the query parameters.
  const { username } = result.data;

  try {
    // Get the developer from the GitHub API.
    const developer = await getGithubDeveloper(username);

    // Return the developer.
    return Response.json(developer);
  } catch(error) {
    // Return a not found error if the developer is not found.
    if (error instanceof NotFoundError) {
      return createApiErrorResponse(
        "DEVELOPER_NOT_FOUND",
        "The requested GitHub developer could not be found.",
        404
      );
    }

    // Return a unavailable error if the developer is temporarily unavailable.
    if (error instanceof ApiError) {
      console.error(
        `GitHub request failed for ${username}:`,
        error
      );

      // Return a unavailable error if the developer is temporarily unavailable.
      return createApiErrorResponse(
        "DEVELOPER_UNAVAILABLE",
        "The requested developer is temporarily unavailable.",
        502
      );
    }

    // Return a internal error if an unexpected error occurs.
    console.error(
      `Unexpected error retrieving developer ${username}:`,
      error
    );

    // Return a internal error if an unexpected error occurs.
    return createApiErrorResponse(
      "INTERNAL_ERROR",
      "An unexpected error occurred while retrieving the developer.",
      500
    );
  }
}
