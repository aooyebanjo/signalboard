import { z } from "zod";

/** Zod schema for a GitHub user. */
export const githubUserSchema = z.object({
  // The login name of the user.
  login: z.string(),
  // The ID of the user.
  id: z.number(),
  // The URL of the user's avatar.
  avatar_url: z.string(),
  // The URL of the user's HTML page.
  html_url: z.string(),

  // The name of the user, can be null.
  name: z.string().nullable(),
  // The company of the user, can be null.
  company: z.string().nullable(),
  // The blog of the user, can be null.
  blog: z.string().nullable(),
  // The location of the user, can be null.
  location: z.string().nullable(),
  // The bio of the user, can be null.
  bio: z.string().nullable(),

  // The number of public repositories the user has.
  public_repos: z.number(),
  // The number of followers the user has.
  followers: z.number(),
  // The number of following the user has.
  following: z.number(),

  // The date and time the user was created.
  created_at: z.string(),
  // The date and time the user was updated.
  updated_at: z.string(),
});

/** Inferred TypeScript type for a validated GitHub user. */
export type GitHubUser = z.infer<
  typeof githubUserSchema
>;