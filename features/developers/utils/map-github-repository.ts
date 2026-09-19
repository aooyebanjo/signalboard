import type { GitHubRepository } from "@/features/developers/schemas/github-repository.schema";

import type { Repository } from "@/features/developers/types/repository";

/**
 * Maps a GitHub repository to a Repository
 */
export function mapGitHubRepository(
  gitHubRepository: GitHubRepository
): Repository {
  return {
    // Map the id from the GitHub repository to the id of the Repository
    id: gitHubRepository.id,

    // Map the name from the GitHub repository to the name of the Repository
    name: gitHubRepository.name,

    // Map the full name from the GitHub repository to the full name of the Repository
    fullName: gitHubRepository.full_name,

    // Map the URL from the GitHub repository to the URL of the Repository
    url: gitHubRepository.html_url,

    // Map the description from the GitHub repository to the description of the Repository
    description: gitHubRepository.description ?? undefined,

    // Map the language from the GitHub repository to the language of the Repository
    language: gitHubRepository.language ?? undefined,

    // Map the stars from the GitHub repository to the stars of the Repository
    stars: gitHubRepository.stargazers_count,

    // Map the forks from the GitHub repository to the forks of the Repository
    forks: gitHubRepository.forks_count,

    // Map the is fork from the GitHub repository to the is fork of the Repository
    isFork: gitHubRepository.fork,

    // Map the is archived from the GitHub repository to the is archived of the Repository
    isArchived: gitHubRepository.archived,

    // Map the created at from the GitHub repository to the created at of the Repository
    createdAt: new Date(gitHubRepository.created_at),

    // Map the updated at from the GitHub repository to the updated at of the Repository
    updatedAt: new Date(gitHubRepository.updated_at),

    // Map the pushed at from the GitHub repository to the pushed at of the Repository
    pushedAt: new Date(gitHubRepository.pushed_at),
  };
}