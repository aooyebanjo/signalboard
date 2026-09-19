// This file is server-only, so it cannot be imported into the client side
import "server-only";

import { githubRepositoriesSchema } from "@/features/developers/schemas/github-repository.schema";
import type { GitHubRepository } from "@/features/developers/schemas/github-repository.schema";
import type { Repository } from "@/features/developers/types/repository";
import { mapGitHubRepository } from "@/features/developers/utils/map-github-repository";

import { GitHubUser, githubUserSchema} from "@/features/developers/schemas/github-user.schema";
import { type Developer } from "@/features/developers/types/developer";
import { mapGithubUser } from "@/features/developers/utils/map-github-user";
import { ApiError, NotFoundError } from "@/lib/error";

/** Base URL for the public GitHub API. */
const GITHUB_API_URL = "https://api.github.com";

/**
 * Gets the headers for the GitHub API.
 * @returns The headers for the GitHub API.
 */
function getGitHubHeaders(): HeadersInit {
  // The headers for the GitHub API
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2026-03-10",
  };

  // The GitHub token
  const token = process.env.GITHUB_TOKEN;

  // If the GitHub token is set, add it to the headers
  if (token) {
    headers.Authorization =
      `Bearer ${token}`;
  }

  // Return the headers
  return headers;
};

/**
 * Fetches a GitHub developer by their username.
 * @param username - The username of the GitHub developer to fetch.
 * @returns The GitHub develope.
 */
export async function getGithubDeveloper(
  username: string
): Promise<Developer> {
  // Fetch the GitHub user, throw an error if the request fails.
  const response = await fetch(`${GITHUB_API_URL}/users/${encodeURIComponent(username)}`, {
    /*
     * GitHub’s current REST docs recommend the application/vnd.github+json Accept header, 
     * show X-GitHub-Api-Version: 2026-03-10, and document 200 and 404 for the public “Get a user” endpoint. 
     * The endpoint can also be used without authentication for public resources.
     */
    headers: getGitHubHeaders(),
  });

  if (response.status === 404) {
    // Throw a not found error if the user is not found.
    throw new NotFoundError(
      `GitHub developer ${username} not found`
    );
  }

  if (!response.ok) {
    // Throw an API error if the request fails.
    throw new ApiError(
      `Unable to retrieve GitHub User ${username}`,
      response.status,
    );
  }

  // Parse the response body as a GitHub user.
  const data: unknown = await response.json();

  // Parse the response body as a GitHub user.
  const gitHubUser: GitHubUser = githubUserSchema.parse(data);

  // Map the GitHub user to our domain `Developer` model.
  const developer: Developer = mapGithubUser(gitHubUser);

  // Return the developer.
  return developer;
};


/**
 * The result of the GitHub repositories request.
 */
interface GitHubRepositoriesResult {
  // The repositories
  repositories: Repository[];
  // Whether there are more repositories to fetch
  hasMore: boolean;
}

/**
 * Options for getting GitHub repositories
 */
interface GetGitHubRepositoriesOptions {
  // The page number to get
  page: number;
  // The number of repositories to get per page
  limit: number;
};

/**
 * Gets GitHub repositories for a given username
 * @param username - The username of the GitHub developer to get repositories for
 * @param options - The options for getting GitHub repositories
 * @returns The GitHub repositories
 */
export async function getGitHubRepositories(
  username: string,
  { 
    page, 
    limit, 
  }: GetGitHubRepositoriesOptions
): Promise<GitHubRepositoriesResult> {
  // Build the search parameters for the GitHub API
  const searchParams = new URLSearchParams({
    page: String(page),
    per_page: String(limit),
    sort: "updated",
    direction: "desc",
    type: "owner",
  });

  // Fetch the repositories from the GitHub API
  const response = await fetch(`${GITHUB_API_URL}/users/${encodeURIComponent(username)}/repos?${searchParams.toString()}`, {
    headers: getGitHubHeaders(),
  });

  // Throw a not found error if the repositories are not found
  if (response.status === 404) {
    throw new NotFoundError(
      `GitHub repositories for ${username} not found`
    );
  }

  // Throw an API error if the request fails
  if (!response.ok) {
    throw new ApiError(
        `Unable to retrieve repositories for ${username}`,
        response.status,
    );
  }

  // Get the link header from the response
  const linkHeader = response.headers.get("link");

  // Whether there are more repositories to fetch
  const hasMore = linkHeader?.includes('rel="next"') ?? false;

  // Parse the response body as a GitHub repository
  const data: unknown = await response.json();

  // Parse the response body as a GitHub repository
  const gitHubRepositories: GitHubRepository[] = githubRepositoriesSchema.parse(data);

  // Map the GitHub repositories to our domain `Repository` model
  const repositories: Repository[] = gitHubRepositories.map(
    (gitHubRepository) => mapGitHubRepository(gitHubRepository)
  );

  // Return the repositories
  return {
    repositories,
    hasMore,
  };
};

/**
 * Gets all the GitHub repositories for a given username
 * @param username - The username of the GitHub developer to get repositories for
 * @returns The GitHub repositories
 */
export async function getAllGitHubRepositories(
  username: string
): Promise<Repository[]> {
  // The repositories
  const repositories: Repository[] = [];

  // The page number
  let page: number = 1;
  // Whether there are more repositories to fetch
  let hasMore: boolean = true;

  // Fetch all the repositories
  while (hasMore) {
    // Fetch the repositories, for each page
    const result: GitHubRepositoriesResult = await getGitHubRepositories(
      username, { 
        page, 
        limit: 100 ,
      }
    );

    // Add the repositories to the list of repositories
    repositories.push(
      ...result.repositories
    );

    // Update the has more flag and the page number to fetch the next page
    hasMore = result.hasMore;
    page++;
  }

  // Return the list of repositories
  return repositories;
};
