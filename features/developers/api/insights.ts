import { z } from "zod";

import type { ApiErrorCode } from "@/lib/api-error";
import { ApiError } from "@/lib/error";

import type { DeveloperInsights } from "@/features/developers/types/developer-insights";

/**
 * The schema for the response of the developer insights API
 */
const developerInsightsResponseSchema = z.object({
  // The total number of repositories the developer has
  totalRepositories: z.number().int().positive(),
  // The total number of stars the developer has
  totalStars: z.number().int().positive(),
  // The total number of forks the developer has
  totalForks: z.number().int().positive(),

  // The most starred repository the developer has
  mostStarredRepository: z.object({
    // The name of the most starred repository
    name: z.string(),
    // The URL of the most starred repository
    url: z.string(),
    // The number of stars the most starred repository has
    stars: z.number().int().positive(),
  }).optional(),

  // The languages the developer has used
  languages: z.array(
    z.object({
      // The language
      language: z.string(),
      // The number of repositories the developer has written in the language
      count: z.number().int().positive(),
    }),
  ),

  // The recently updated repositories
  recentlyUpdatedRepositories: z.array(
    z.object({
      // The name of the repository
      name: z.string(),
      // The URL of the repository
      url: z.string(),
      // The date the repository was last pushed to
      pushedAt: z.string().datetime(),
    })
  ),
});

/**
 * The schema for the error response of the developer insights API
 */
const apiErrorResponseSchema = z.object({
  error: z.object({
    code: z.string(),
    message: z.string(),
  }),
});

/**
 * Gets the insights for a developer
 * @param username - The username of the developer
 * @returns The insights for the developer
 */
export async function getDeveloperInsights(
  username: string
): Promise<DeveloperInsights> {
  // Fetch the developer insights from the API
  const response = await fetch(`/api/developers/${encodeURIComponent(username)}/insights`);

  if (!response.ok) {
    // Parse the error response
    const errorData: unknown = await response.json();

    // Parse error data from the response body as a API error response
    const parsedError = apiErrorResponseSchema.safeParse(errorData);

    if (parsedError.success) {
      // Throw an API error if the error response is valid, because the username is invalid, or the developer is not found
      throw new ApiError(
        parsedError.data.error.message,
        response.status,
        parsedError.data.error.code as ApiErrorCode,
      );
    }

    // Throw an API error if the error response is not valid, because the developer insights are not available
    throw new ApiError(
      "Failed to retrieve developer insights",
      response.status,
    );
  }

  // Retrieve the response body as a JSON object
  const data: unknown = await response.json();

  // Parse developerInsights from the response data
  const developerInsights: z.infer<typeof developerInsightsResponseSchema> = developerInsightsResponseSchema.parse(data);

  // Return the developer insights
  return {
    // The total number of repositories
    ...developerInsights,

    // The recently updated repositories
    recentlyUpdatedRepositories: developerInsights.recentlyUpdatedRepositories.map((repository) => ({
      name: repository.name,
      url: repository.url,
      pushedAt: new Date(repository.pushedAt),
    })),
  };
};
