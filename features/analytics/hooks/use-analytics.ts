"use client"

/**
 * useQuery is a React Hook used to retrieve data from a query.
 */
import { useQuery } from "@tanstack/react-query";

/**
 * getAnalytics is used to retrieve analytics for a given username.
 */
import { getAnalytics } from "@/features/analytics/api/analytics";

/**
 * Analytics Query Keys, a utility for managing analytics query keys, used to create and manage query keys for the analytics API.
 */
import { analyticsQueryKeys } from "@/features/analytics/utils/analytics-query-keys";

/**
 * Type definition for the analytics API error.
 */
import { AnalyticsApiError } from "@/features/analytics/api/analytics-api-error";

/**
 * useAnalytics is a React Hook used to retrieve analytics for a given username.
 * 
 * @param username The username to retrieve analytics for.
 * @returns A UseQueryResult that resolves to the analytics overview for the given username.
 */
export function useAnalytics(
  username: string,
) {
  /**
   * Normalize the username to lower case and remove any whitespace.
   */
  const normalizedUsername: string = username.trim().toLowerCase();

  return useQuery({
    /**
     * The query key for the analytics overview query.
     */
    queryKey: analyticsQueryKeys.overivew(normalizedUsername),

    /**
     * The query function to retrieve the analytics overview.
     */
    queryFn: ({ signal }) => getAnalytics(normalizedUsername, signal),

    /**
     * Enable the query only if the normalized username has a length greater than 0.
     */
    enabled: normalizedUsername.length > 0,

    /**
     * The time period for which the query data is considered fresh.
     */
    staleTime: 1000 * 60 * 5, // 5 minutes,

    /**
     * The time period for which the query data is considered garbage collected.
     */
    gcTime: 1000 * 60 * 15,  // 15 minutes,

    /**
     * The number of times to retry the query if it fails.
     */
    retry: (failureCount, error) => {
      if (error instanceof AnalyticsApiError) {
        if (
          error.status === 400 ||
          error.status === 404 ||
          error.status === 429
        ) {
          return false;
        }
      }

      return failureCount < 1;
    },

    /**
     * Whether to refetch the query when the window regains focus.
     */
    refetchOnWindowFocus: false,
  });
};
