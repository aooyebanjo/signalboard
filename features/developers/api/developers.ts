import { z } from "zod";

import type { ApiErrorCode} from "@/lib/api-error";
import { ApiError } from "@/lib/error";

import type { Developer} from "@/features/developers/types/developer";

/**
 * @description Developer response schema
 */
const developeResponseSchema = z.object({
  // The developer's unique identifier
  id: z.number(),
  username: z.string(),
  // The developer's name
  name: z.string().optional(),
  // The developer's avatar URL
  avatarUrl: z.string(),
  // The developer's profile URL
  profileUrl: z.string(),

  // The developer's bio
  bio: z.string().optional(),
  // The developer's company
  company: z.string().optional(),
  // The developer's location
  location: z.string().optional(),
  // The developer's website
  website: z.string().optional(),

  // The number of repositories the developer has
  repositoryCount: z.number(),
  // The number of followers the developer has
  followers: z.number(),
  // The number of following the developer has
  following: z.number(),
  // The date the developer joined the platform

  // The date the developer joined the platform
  joinedAt: z.string().datetime(),
  // The date the developer updated their profile
  updatedAt: z.string().datetime(),
});

/**
 * @description API error response schema
 */
const apiErrorResponseSchema = z.object({
  error: z.object({
    code: z.string(),
    message: z.string(),
  }),
});

/**
 * @description Get a developer by username
 * @param username - The username of the developer
 * @returns The developer
 */
export async function getDeveloper(
  username: string
): Promise<Developer> {
  // Fetch the developer from the API
  const response = await fetch(`/api/developers/${encodeURIComponent(username)}`);

  if (!response.ok) {
    // Parse the error response
    const errorData: unknown = await response.json();

    // Parse the error response
    const parsedError = apiErrorResponseSchema.safeParse(
      errorData
    );

    if (parsedError.success) {
      // Throw an API error if the error response is valid
      throw new ApiError(
        parsedError.data.error.message,
        response.status,
        parsedError.data.error.code as ApiErrorCode,
      );
    }

    // Throw an API error if the error response is not valid
    throw new ApiError(
      "Failed to retrieve developer",
      response.status
    );
  }

  // Parse the response body as a developer
  const data: unknown = await response.json();

  // Parse the response body as a developer
  const developer: z.infer<typeof developeResponseSchema> = developeResponseSchema.parse(data);

  // Return the developer
  return {
    ...developer,
    joinedAt: new Date(developer.joinedAt),
    updatedAt: new Date(developer.updatedAt),
  };
};



