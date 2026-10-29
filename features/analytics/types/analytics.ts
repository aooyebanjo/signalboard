
/**
 * Story Metrics, describes aggregated Hacker News story data, used to track the number of stories, 
 * the total score, the total comments, the average score, and the average comments.
 */
export interface StoryMetrics {
  totalStories: number;
  totalScore: number;
  totalComments: number;
  averageScore: number;
  averageComments: number;
};

/**
 * Developer Metrics, describes aggregated GitHub repository data, used to track the number of repositories, the total stars, and the total forks.
 */
export interface DeveloperMetrics {
  totalRepositories: number;
  totalStars: number;
  totalForks: number;
};

/**
 * Language Distribution, describes a chart-ready data point, used to track the number of stories written in each language.
 */
export interface LanguageDistribution {
  language: string;
  count: number;
};

/**
 * Analytics Overview, composes them into the response that our dashboard will eventually consume, used to track the number of stories, the total score, the total comments, 
 * the average score, the average comments, the number of repositories, the total stars, the total forks, and the language distribution.
 */
export interface AnalyticsOverview {
  stories: StoryMetrics;
  developers: DeveloperMetrics;
  languages: LanguageDistribution[];

  scope: {
    username: string;
    storySampleSize: number;
    repositorySampleSize: number;
    generatedAt: string;
  };
};


