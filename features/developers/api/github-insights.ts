import "server-only";

import type { DeveloperInsights } from "@/features/developers/types/developer-insights";
import type { Repository } from "@/features/developers/types/repository";
import { calculateDeveloperInsights} from "@/features/developers/utils/calculate-developer-insights";
import { getAllGitHubRepositories } from "@/features/developers/api/github";

/**
 * Gets the developer insights for a given GitHub username
 * @param username - The username of the developer to get insights for
 * @returns The developer insights
 */
export async function getGitHubDeveloperInsights(
  username: string
): Promise<DeveloperInsights> {
  // Get all the repositories for the developer
  const repositories: Repository[] = await getAllGitHubRepositories(username);

  // Get the developer insights
  const developerInsights: DeveloperInsights = calculateDeveloperInsights(repositories);

  // Return the developer insights
  return developerInsights;
};
