
/**
 * Zod schema for validating the analytics response.
 */
import { analyticsResponseSchema } from "@/features/analytics/schemas/analytics-response.schema";

/**
 * Type definition for the analytics response.
 */
import { AnalyticsOverview } from "@/features/analytics/types/analytics";

/**
 * Type definition for the analytics API error.
 */
import { AnalyticsApiError } from "@/features/analytics/api/analytics-api-error";

/**
 * getAnalytics is used to retrieve analytics for a given username.
 * 
 * @param username The username to retrieve analytics for.
 * @returns A promise that resolves to the analytics for the given username.
 */
export async function getAnalytics(
  username: string,
  signal?: AbortSignal,
): Promise<AnalyticsOverview> {
  /**
   * Build the search parameters for the analytics API, used to retrieve analytics for a given username.
   */
  const searchParams = new URLSearchParams({
    username,
  });

  /**
   * Fetch the analytics data from the analytics API.
   */
  const response = await fetch(
    `/api/analytics?${searchParams.toString()}`,
    ...(signal ? [{ signal }] : [])
  );

  /**
   * Check if the request was successful.
   */
  if (!response.ok) {
    /**
     * Handle 400 Bad Request errors, which typically indicate invalid request parameters.
     */
    if (response.status === 400) {
      throw new AnalyticsApiError(
        "Please enter a valid GitHub username.",
        400
      );
    }

    /**
     * Handle 404 Not Found errors, which typically indicate that the requested resource was not found.
     */
    if (response.status === 404) {
      throw new AnalyticsApiError(
        `GitHub user "${username}" was not found.`,
        404
      );
    }

    /**
     * Handle 429 Too Many Requests errors, which typically indicate rate limiting.
     */
    if (response.status === 429) {
      throw new AnalyticsApiError(
        "Too many requests. Please try again later.",
        429
      );
    }

    /**
     * Handle 500 Internal Server errors, which typically indicate server-side issues.
     */
    throw new AnalyticsApiError(
      `Unable to retrieve analytics for HTTP ${response.status}`,
      response.status
    );
  }

  /**
   * Parse the response as JSON; data is unknown type and is the responsibility of Zod to validate.
   */
  const data: unknown = await response.json();

  /**
   * Parse the analytics data using the analyticsResponseSchema.
   */
  try {
    /**
     * Parse the analytics response data.
     */
    const validatedResponse = analyticsResponseSchema.parse(data);

    /**
     * Return the analytics response data.
     */
    return validatedResponse.data;
  }
  /**
   * Handle errors during parsing.
   */
  catch (error) {
    throw new Error(
      `Unable to parse analytics response: ${error}`
    );
  }

};

