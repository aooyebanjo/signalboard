
/**
 * Interface for the analytics page client component.
 */
import {
  githubUsernameSchema,
} from "../schemas/github-username.schema";

/**
 * Validate Github username with the given pattern.
 * 
 * @param username The username to validate.
 * @returns True if the username is valid, false otherwise.
 */
export function validateGithubUsername(
  username: string
): boolean {
  /**
   * Validate the username with the given schema, that uses Zod for validation.
   */
  return githubUsernameSchema.safeParse(username).success;
};
