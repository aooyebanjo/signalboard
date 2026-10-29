
import { z } from "zod";

/**
 * Story Metrics Schema, describes the metrics for a given story, used to track the number of stories, the total score, the total comments, the average score, and the average comments.
 */
export const storyMetricsSchema = z.object({
  totalStories: z.number(),
  totalScore: z.number(),
  totalComments: z.number(),
  averageScore: z.number(),
  averageComments: z.number(),
});

/**
 * Developer Metrics Schema, describes the metrics for a given developer, used to track the number of repositories, the total stars, and the total forks.
 */
export const developerMetricsSchema = z.object({
  totalRepositories: z.number(),
  totalStars: z.number(),
  totalForks: z.number(),
});

/**
 * Language Distribution Schema, describes the distribution of languages, used to track the number of repositories for each language.
 */
export const languageDistributionSchema = z.object({
  language: z.string(),
  count: z.number(),
});

/**
 * Analytics Overview Schema, describes the overview of the analytics, used to track the stories, the developers, the languages, and the scope.
 */
export const analyticsOverviewSchema = z.object({
  stories: storyMetricsSchema,
  developers: developerMetricsSchema,

  languages: z.array(
    languageDistributionSchema,
  ),

  scope: z.object({
    username: z.string(),
    storySampleSize: z.number(),
    repositorySampleSize: z.number(),
    generatedAt: z.iso.datetime(),
  }),
});

/**
 * Analytics Response Schema, describes the response for the analytics, used to track the data.
 */
export const analyticsResponseSchema = z.object({
  data: analyticsOverviewSchema,
});
