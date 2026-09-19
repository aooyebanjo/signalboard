"use client";

import { useQuery } from "@tanstack/react-query";

import { getDeveloper } from "@/features/developers/api/developers";
import { developerQueryKeys } from "@/features/developers/query-keys";

/**
 * @description Hook to fetch a developer by username
 * @param username - The username of the developer to fetch
 * @returns The developer
 */
export function useDeveloper(username: string) {
  // Normalize the username to trim whitespace
  const normalizedUsername = username.trim();

  // Return the developer query
  return useQuery({
    // The query key for the developer query
    queryKey: developerQueryKeys.detail(normalizedUsername),

    // The query function to fetch the developer
    queryFn: () => getDeveloper(normalizedUsername),

    // The enabled flag to determine if the query should be executed
    enabled: normalizedUsername.length > 0,

    // The stale time for the developer query
    staleTime: 5 * 60 * 1000, 
  });
};

