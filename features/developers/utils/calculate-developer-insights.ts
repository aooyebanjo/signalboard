import type { Repository } from "@/features/developers/types/repository";
import type { DeveloperInsights } from "@/features/developers/types/developer-insights";

/**
 * 
 * @param repositories - The repositories to get the insights from
 * @returns The developer insights
 */
export function calculateDeveloperInsights(
  repositories: Repository[]
): DeveloperInsights {
  // Calculate the total number of stars
  const totalStars: number = repositories.reduce<number>(
    (total: number, repository: Repository) => total + repository.stars,
    0
  );

  // Calculate the total number of forks
  const totalForks: number = repositories.reduce<number>(
    (total: number, repository: Repository) => total + repository.forks,
    0
  );

  // Find the most starred repository
  const mostStarredRepository = repositories.reduce<Repository | undefined>(
    (mostStarred: Repository | undefined, repository: Repository) => {
      if(
        !mostStarred || repository.stars > mostStarred.stars
      ) {
        return repository
      }

      return mostStarred;
    },
    undefined
  );

  // Count the number of repositories for each language
  const languageCounts = repositories.reduce<Record<string, number>>(
    (counts: Record<string, number>, repository: Repository) => {
      if (!repository.language) {
        return counts;
      }

      counts[repository.language] = (counts[repository.language] ?? 0) + 1;

      return counts;
    },
    {}
  );

  // Sort the languages by the number of repositories
  const languages = Object.entries(languageCounts)
                          .map(([language, count]) => ({
                            language,
                            count,
                          }))
                          .sort(
                            (a, b) => b.count - a.count
                          );

  // Get the recently updated repositories
  const recentlyUpdatedRepositories =
  [...repositories]
    .sort(
      (a, b) =>
        b.pushedAt.getTime() -
        a.pushedAt.getTime()
    )
    .slice(0, 3)
    .map((repository) => ({
      name: repository.name,
      url: repository.url,
      pushedAt: repository.pushedAt,
    }));

  // Return the developer insights
  return {
    // The total number of repositories
    totalRepositories: repositories.length,

    // The total number of stars
    totalStars,

    // The total number of forks
    totalForks,

    // The most starred repository
    mostStarredRepository: mostStarredRepository 
                            ? {
                              name: mostStarredRepository.name,

                              url: mostStarredRepository.url,

                              stars: mostStarredRepository.stars,
                            } 
                            : undefined,

    // The languages used in the repositories
    languages,

    // The recently updated repositories
    recentlyUpdatedRepositories,
  };
};
