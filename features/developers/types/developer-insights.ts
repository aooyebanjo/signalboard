/**
 * Interface for developer insights
 */
export interface DeveloperInsights {
  // The total number of repositories
  totalRepositories: number;
  // The total number of stars
  totalStars: number;
  // The total number of forks
  totalForks: number;

  // The most starred repository
  mostStarredRepository?: {
    // The name of the repository
    name: string;
    // The URL of the repository
    url: string;
    // The number of stars the repository has
    stars: number;
  };

  // The languages used in the repositories
  languages: Array<{
    // The language
    language: string;
    // The number of repositories that use the language
    count: number;
  }>;

  // The recently updated repositories
  recentlyUpdatedRepositories: Array<{
    // The name of the repository
    name: string;
    // The URL of the repository
    url: string;
    // The date the repository was last pushed to
    pushedAt: Date;
  }>;
};
