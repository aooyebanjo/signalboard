"use client";

import { useQuery } from "@tanstack/react-query";

import { locationQueryKeys } from "../utils/location-query-keys";

import { searchLocations } from "../api/locations";

/**
 * A hook to search for locations by query.
 * @param query - The query to search for.
 * @returns The locations found.
 */
export function useLocationSearch(
  query: string,
) {
  // Normalize the query by trimming it.
  const normalizedQuery: string = query.trim();

  // Return the query result.
  return useQuery({
    // The query key.
    queryKey: locationQueryKeys.search(normalizedQuery),

    // The query function.
    queryFn: () => searchLocations(normalizedQuery),

    // Whether the query is enabled.
    enabled: normalizedQuery.length >= 2,

    // The stale time.
    staleTime: 1000 * 60 * 5,
  });
};

