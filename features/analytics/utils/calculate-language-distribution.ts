
import type { LanguageDistribution } from "../types/analytics";

/**
 * Repository Language Input, describes the input data for calculating repository language distribution, used to track the number of repositories for each language.
 */
export interface RepositoryLanguageInput {
  language?: string | null;
};

/**
 * Calculate Language Distribution, calculates the language distribution for a given array of repository language inputs, 
 * used to track the number of repositories for each language.
 * Why is repositories readonly? Because we do not want to mutate the input array of repository language inputs.
 */
export function calculateLanguageDistribution(
  repositories: readonly RepositoryLanguageInput[]
): LanguageDistribution[] {
  const languageCounts = new Map<string, number>();

  for (const repository of repositories) {
    const { language } = repository;

    if(!language) {
      continue;
    }

    const currentCount = languageCounts.get(language) ?? 0;

    languageCounts.set(
      language, 
      currentCount + 1
    );
  }

  return Array.from(
    languageCounts, 
    ([ language, count ]) => ({ 
      language, count 
    })).sort((a, b) => b.count - a.count);
};

