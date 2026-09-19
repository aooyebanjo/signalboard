"use client";

import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getRepositories } from "../api/repositories";
import { developerQueryKeys } from "../query-keys";

/**
 * Interface for options to use repositories
 */
interface UseRepositoriesOptions {
  page: number;
  limit: number;
};

/**
 * Hook to use repositories, fetches repositories for a developer's username
 * @param username - The username of the developer
 * @param page - The page number to get
 * @param limit - The limit of repositories to get per page
 * @returns The repositories
 */
export function useRepositories(
  username: string, 
  { 
    page, 
    limit, 
  }: UseRepositoriesOptions
) {
  // Normalize the username to trim whitespace
  const normalizedUsername = username.trim();

  // Return the useQuery hook
  return useQuery({
    // The query key to identify the query
    queryKey: [
      // The query key for the developer
      ...developerQueryKeys.detail(
        normalizedUsername
      ),

      // The query key for the repositories
      'repositories',

      // The page number to get
      page,
      limit,
    ],

    // The query function to get the repositories
    queryFn: () => getRepositories(
      normalizedUsername, 
      { 
        page, 
        limit, 
      }
    ),

    // The enabled flag to determine if the query should be executed
    enabled: normalizedUsername.length > 0,

    // The stale time for the repositories
    staleTime: 5 * 60 * 1000,

    // The placeholder data to use while the query is fetching
    placeholderData: keepPreviousData,
  });
};



