import { z } from "zod";

/**
 * A valid Github username matches the following criteria:
 * - Between 1 and 39 characters long.
 * - May only contain alphanumeric characters and hyphens.
 * - Cannot start or end with a hyphen.
 * - Cannot contain consecutive hyphens.
 */
export const githubUsernameSchema = z
  .string()
  .min(1, "GitHub username is required")
  .max(39, "GitHub username cannot exceed 39 characters")
  .regex(
    /^(?!.*--)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,37}[a-zA-Z0-9])?$/,
    "Please enter a valid GitHub username"
  );

/**
 * An analytics query contains the github username
 * 
 * @interface
 */
export const analyticsQuerySchema = z.object({
  username: githubUsernameSchema,
});