
import { NextRequest } from "next/server";

import { z } from "zod";

/**
 * getTopStories is used to retrieve the top stories from Hacker News.
 */
import { getTopStories } from "@/features/stories/api/hacker-news";

/**
 * getAllGitHubRepositories is used to retrieve all repositories for a given username.
 */
import { getAllGitHubRepositories } from "@/features/developers/api/github";

/**
 * calculateStoryMetrics is used to calculate the story metrics for a given set of stories.
 */
import { calculateStoryMetrics } from "@/features/analytics/utils/calculate-story-metrics";

/**
 * calculateDeveloperMetrics is used to calculate the developer metrics for a given set of repositories.
 */
import { calculateDeveloperMetrics } from "@/features/analytics/utils/calculate-developer-metrics";

/**
 * calculateLanguageDistribution is used to calculate the language distribution for a given set of repositories.
 */
import { calculateLanguageDistribution } from "@/features/analytics/utils/calculate-language-distribution";

/**
 * Analytics Overview Schema, describes the analytics overview for a given username.
 */
import { analyticsOverviewSchema } from "@/features/analytics/schemas/analytics-response.schema";

/**
 * Analytics Query Schema, describes the query parameters for the analytics API, used to validate the username.
 */
import { analyticsQuerySchema } from "@/features/analytics/schemas/github-username.schema";

/**
 * Analytics Overview, describes the analytics overview for a given username.
 */
import { AnalyticsOverview } from "@/features/analytics/types/analytics";

/**
 * NotFoundError, used to handle not found errors.
 */
import { NotFoundError } from "@/lib/error";

/**
 * GET, handles GET requests to the analytics API, used to retrieve analytics for a given username.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const validation = analyticsQuerySchema.safeParse({
    username: searchParams.get('username') ?? undefined
  });

  if (!validation.success) {
    return Response.json(
      {
        error: {
          code: "INVALID_QUERY_PARAMETERS",
          message: "A valid Github username is required.",
        }
      },
      {
        status: 400,
      }
    );
  }

  const { username } = validation.data;

  try {
    // Retrieve the top stories from Hacker News, and all repositories for a given username.
    // Use Promise.all to retrieve the data in parallel.
    const [stories, repositories] = await Promise.all([
      getTopStories(20),
      getAllGitHubRepositories(username),
    ]);

    // Calculate the analytics overview, and validate the response.
    // This is done to ensure that the data is in the correct format.
    // And it should be done at the last minute to ensure that the data is fresh.
    const overview: AnalyticsOverview = {
      stories: calculateStoryMetrics(stories),

      developers: calculateDeveloperMetrics(repositories),

      languages: calculateLanguageDistribution(repositories),

      scope: {
        username,
        storySampleSize: stories.length,
        repositorySampleSize: repositories.length,
        generatedAt: new Date().toISOString(),
      }
    };

    // Validate the analytics overview.
    // This is done to ensure that the data is in the correct format.
    const validationOverview = analyticsOverviewSchema.parse(overview);

    // Return the analytics overview.
    // Why use NextResponse? To leverage Next.js's built-in API response handling and error handling.
    return Response.json({
      data: validationOverview,
    });
  } catch (error) {
    console.error("Analytics API failed:", error);

    if (error instanceof NotFoundError) {
      return Response.json(
        {
          error: {
            code: "USER_NOT_FOUND",
            message: "Github developer not found",
          }
        },
        {
          status: 404,
        }
      );
    }

    return Response.json(
      {
        error: {
          code: "ANALYTICS_UNAVAILABLE",
          message: "Unable to retrieve analytics.",
        }
      },
      {
        status: 500,
      }
    );
  }
};
