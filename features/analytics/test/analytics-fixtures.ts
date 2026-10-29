import type {
  AnalyticsOverview,
} from "../types/analytics";

/**
 * Test fixture for analytics overview data.
 * Used in tests for the analytics feature.
 */
export const analyticsFixture: AnalyticsOverview = {
  stories: {
    totalStories: 20,
    totalScore: 2301,
    totalComments: 1021,
    averageScore: 115.05,
    averageComments: 51.05,
  },

  developers: {
    totalRepositories: 8,
    totalStars: 22341,
    totalForks: 168765,
  },

  languages: [
    {
      language: "HTML",
      count: 1,
    },
    {
      language: "CSS",
      count: 1,
    },
    {
      language: "Ruby",
      count: 1,
    },
  ],

  scope: {
    username: "octocat",
    storySampleSize: 20,
    repositorySampleSize: 8,
    generatedAt: "2026-10-28T12:00:00.000Z",
  },
};

/**
 * Test fixture for analytics overview data with zero values.
 * Used in tests for the analytics feature.
 */
export const emptyAnalyticsFixture: AnalyticsOverview = {
  stories: {
    totalStories: 0,
    totalScore: 0,
    totalComments: 0,
    averageScore: 0,
    averageComments: 0,
  },

  developers: {
    totalRepositories: 0,
    totalStars: 0,
    totalForks: 0,
  },

  languages: [],

  scope: {
    username: "empty-user",
    storySampleSize: 0,
    repositorySampleSize: 0,
    generatedAt: "2026-10-28T12:00:00.000Z",
  },
};