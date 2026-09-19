import { z } from "zod";

import { getGitHubRepositories } from "@/features/developers/api/github";

import { createApiErrorResponse } from "@/lib/api-error";

import { ApiError, NotFoundError } from "@/lib/error";

// import type { Repository } from "@/features/developers/types/repository";

/**
 * The schema for the username parameter in the route.
 */
const paramsSchema = z.object({
  username: z
            .string()
            .trim()
            .min(1)
            .max(39),
});

/**
 * The schema for the query parameters in the route.
 */
const querySchema = z.object({
  // The page coerced number to get, defaults to 1, must be a positive integer.
  page: z.coerce
          .number()
          .int()
          .positive()
          .default(1),

  // The limit coerced number to get per page, defaults to 10, must be a positive integer between 1 and 50.
  limit: z.coerce
          .number()
          .int()
          .min(1)
          .max(50)
          .default(10),
});

/**
 * The context for the repositories route.
 */
interface RepositoriesRouteContext {
  params: Promise<{
    username: string
  }>;
};

/**
 * The GET handler for the repositories route.
 */
export async function GET(
  request: Request,
  context: RepositoriesRouteContext,
) {
  // Extract the username from the route parameters.
  const params = await context.params;

  // Parse the username using the schema.
  const parsedParams = paramsSchema.safeParse(params);

  // If the username is invalid, return a 400 error.
  if (!parsedParams.success) {
    return createApiErrorResponse(
      "INVALID_DEVELOPER_USERNAME",
      "The Github username is invalid",
      400,
    );
  }

  // Extract the query parameters from the request URL.
  const url: URL = new URL(request.url);

  // Parse the query parameters, page and limit, using the schema.
  const parsedQuery = querySchema.safeParse({
    page: url.searchParams.get('page') ?? undefined,
    limit: url.searchParams.get('limit') ?? undefined,
  });

  // If the query parameters are invalid, return a 400 error.
  if (!parsedQuery.success) {
    return createApiErrorResponse(
      "INVALID_QUERY_PARAMETERS",
      "The repository query parameters are invalid",
      400,
    );
  }

  // Extract the username and query parameters from the parsed data.
  const { username } = parsedParams.data;

  // Extract the page and limit from the parsed query parameters.
  const { page, limit } = parsedQuery.data;

  try {
    // Get the repositories from the GitHub API.
    const {
      repositories,
      hasMore,
    } = await getGitHubRepositories(
      username,
      {
        page,
        limit,
      }
    );

    // Return the repositories and pagination information as a JSON response.
    return Response.json({
      data: repositories,

      pagination: {
        page,
        limit,
        hasMore,
      }
    });
  }
  catch(error) {
    if (error instanceof NotFoundError) {
      // If the developer is not found, return a 404 error.
      return createApiErrorResponse(
        "DEVELOPER_NOT_FOUND",
        "The requested GitHub developer could not be found",
        404
      );
    }

    // If the repositories are unavailable, return a 502 error.
    if (error instanceof ApiError) {
      // Log the error.
      console.error(
        `GitHub repository request failed for ${username}`, 
        error,
      );

      // Return a 502 error, indicating a temporary issue with the GitHub API.
      return createApiErrorResponse(
        "REPOSITORIES_UNAVAILABLE",
        "The developer's repositories are unavailable",
        502,
      );
    }

    // If an unexpected error occurs, return a 500 error.
    return createApiErrorResponse(
      "INTERNAL_ERROR",
      "An unexpected error occurred while retrieving repositories",
      500
    );
  }
};
