import { z } from "zod";

/**
 * Schema for a GitHub repository
 */
export const githubRepositorySchema = z.object({
  // The unique identifier for the repository
  id: z.number(),
  // The name of the repository
  name: z.string(),
  // The full name of the repository
  full_name: z.string(),

  // The URL of the repository
  html_url: z.string(),
  // The description of the repository
  description: z.string().nullable(),

  // The language of the repository
  language: z.string().nullable(),
  // The number of stars the repository has

  stargazers_count: z.number(),
  // The number of forks the repository has
  forks_count: z.number(),

  // Whether the repository is a fork
  fork: z.boolean(),
  // Whether the repository is archived
  archived: z.boolean(),

  // The date the repository was created
  created_at: z.string(),
  // The date the repository was last updated
  updated_at: z.string(),
  // The date the repository was last pushed to
  pushed_at: z.string(),
});

/**
 * Schema for an array of GitHub repositories
 */
export const githubRepositoriesSchema = z.array(
  githubRepositorySchema
);

/**
 * Type for a GitHub repository
 */
export type GitHubRepository = z.infer<
  typeof githubRepositorySchema
>;