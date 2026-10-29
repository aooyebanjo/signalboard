
import type { DeveloperMetrics } from "../types/analytics";

/**
 * Repository Metric Input, describes the input data for calculating repository metrics, used to track the number of stars and forks.
 */
export interface RepositoryMetricInput {
  stars: number;
  forks: number;
};

/**
 * Calculate Developer Metrics, calculates the developer metrics for a given array of repository metric inputs, 
 * used to track the number of repositories, the total stars, and the total forks.
 * Why is repositories readonly? Because we do not want to mutate the input array of repository metric inputs; 
 */
export function calculateDeveloperMetrics(
  repositories: readonly RepositoryMetricInput[]
): DeveloperMetrics {
  const totals = repositories.reduce((accumulator, repository) => {
    accumulator.totalStars += repository.stars;
    accumulator.totalForks += repository.forks;

    return accumulator;
  },
    {
      totalStars: 0,
      totalForks: 0,
    }
  );

  return {
    totalRepositories: repositories.length,
    totalStars: totals.totalStars,
    totalForks: totals.totalForks,
  }
};
