"use client";

import { useQuery } from "@tanstack/react-query";

import { getLocationByCoordinates } from "../api/locations";

import { locationQueryKeys } from "../utils/location-query-keys";

/**
 * The options for the useLocationByCoordinates hook.
 */
interface UseLocationByCoordinatesOptions {
  // The latitude of the location.
  latitude: number | null;
  // The longitude of the location.
  longitude: number | null;
};

/**
 * The useLocationByCoordinates hook.
 * @param options - The options for the hook.
 * @returns The location by coordinates.
 */
export function useLocationByCoordinates({
  latitude,
  longitude,
}: UseLocationByCoordinatesOptions) {
  // Check if the latitude and longitude are provided.
  const hasCoordinates = latitude !== null && longitude !== null;

  // Return the query for the location by coordinates.
  return useQuery({
    // The query key for the location by coordinates.
    queryKey: locationQueryKeys.location(
      latitude, 
      longitude,
    ),

    // The query function for the location by coordinates.
    queryFn: () => {
      if (latitude === null || longitude === null) {
        // Throw an error if the latitude or longitude is not provided.
        throw new Error(
          "Latitude and Longitude coordinates are required"
        );
      }

      // Get the location by coordinates.
      return getLocationByCoordinates(
        latitude, 
        longitude,
      );
    },

    // The enabled flag for the query.
    enabled: hasCoordinates,

    // The stale time for the query.
    staleTime: 1000 * 60 * 5,
  });
};

