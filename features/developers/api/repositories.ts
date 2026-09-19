import { z } from "zod";

import type { ApiErrorCode } from "@/lib/api-error";
import { ApiError } from "@/lib/error";

import type { Repository } from "../types/repository";

/**
 * Schema for a repository response
 */
const repositoryResponseSchema = z.object({
  // The unique identifier for the repository
  id: z.number(),
  // The name of the repository
  name: z.string(),
  // The full name of the repository
  fullName: z.string(),

  // The URL of the repository
  url: z.string(),
  // The description of the repository
  description: z.string().optional(),

  // The language of the repository
  language: z.string().optional(),
  // The number of stars the repository has

  stars: z.number(),
  // The number of forks the repository has
  forks: z.number(),
  // Whether the repository is a fork

  isFork: z.boolean(),
  // Whether the repository is archived
  isArchived: z.boolean(),
  // The date the repository was created

  createdAt: z.string().datetime(),
  // The date the repository was last updated
  updatedAt: z.string().datetime(),
  // The date the repository was last pushed to
  pushedAt: z.string().datetime(),
});

/**
 * Schema for a repositories page response
 */
const repositoriesPageSchema = z.object({
  data: z.array(repositoryResponseSchema),

  pagination: z.object({
    page: z.number(),
    limit: z.number(),
    hasMore: z.boolean(),
  }),
});

/**
 * Schema for an API error response
 */
const apiErrorResponseSchema = z.object({
  error: z.object({
    code: z.string(),
    message: z.string(),
  }),
});

/**
 * Interface for a repositories page
 */
export interface RepositoriesPage {
  data: Repository[];

  pagination: {
    page: number;
    limit: number;
    hasMore: boolean;
  };
};

/**
 * Interface for options to get repositories
 */
interface GetRepositoriesOptions {
  // The page number to get
  page: number;
  // The limit of repositories to get per page
  limit: number;
};

/**
 * Get repositories for a developer
 */
export async function getRepositories(
  username: string,
  { 
    page, 
    limit, 
  }: GetRepositoriesOptions,
): Promise<RepositoriesPage>{
  // Create the search params for the request
  const searchParams = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  // Fetch the repositories
  const response = await fetch(`/api/developers/${encodeURIComponent(username)}/repositories?${searchParams.toString()}`);

  // If the response is not ok, throw an error
  if (!response.ok) {
    // Parse the error data
    const errorData: unknown =
      await response.json();

    // Parse the error data
    const parsedError =
      apiErrorResponseSchema.safeParse(errorData);

    // If the error is valid, throw an error
    if (parsedError.success) {
      throw new ApiError(
        parsedError.data.error.message,
        response.status,
        parsedError.data.error.code as ApiErrorCode
      );
    }

    // If the error is not valid, throw a generic error
    throw new ApiError(
      "Failed to retrieve repositories",
      response.status
    );
  }

  // Retrieving the data from the response
  const data: unknown = await response.json();

  // Parsing the response data
  const results = repositoriesPageSchema.parse(data);

  // Return the repositories page
  return {
    data: results.data.map(
      (repository): Repository => ({
        ...repository,

        createdAt: new Date(repository.createdAt),
        updatedAt: new Date(repository.updatedAt),
        pushedAt: new Date(repository.pushedAt),
      })
    ),

    pagination: {
      page,
      limit,
      hasMore: results.pagination.hasMore,
    },
  }
}