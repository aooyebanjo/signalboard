"use client";

import { useQuery } from "@tanstack/react-query";

import { getDeveloperInsights} from "@/features/developers/api/insights";

import { developerQueryKeys } from "@/features/developers/query-keys";

/**
 * The hook to get the insights for a developer
 * @param username - The username of the developer
 * @returns The insights for the developer
 */
export function useDeveloperInsights(
  username: string
) {
  // Normalize the username to lowercase
  const normalizedUsername = username.toLowerCase();

  return useQuery({
    // The query key for the developer insights query
    queryKey: developerQueryKeys.insights(normalizedUsername),
    
    // The query function for the developer insights query
    queryFn: () => getDeveloperInsights(normalizedUsername),

    // Whether the query is enabled
    enabled: normalizedUsername.length > 0,

    // The stale time for the developer insights query
    staleTime: 5 * 60 * 1000,
  });
};
