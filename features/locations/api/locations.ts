
import type { Location } from "../types/location";

import { locationSearchResponseSchema, locationResponseSchema } from "../schemas/location-response.schema";

/**
 * Search for locations by query.
 * @param query - The query to search for.
 * @returns The locations found.
 */
export async function searchLocations(
  query: string,
): Promise<Location[]> {
  // Create the search params for the query.
  const searchParams = new URLSearchParams({
    q: query,
  });

  // Fetch the locations from the API.
  const response = await fetch(`/api/locations/search?${searchParams.toString()}`);

  // console.log(
  //   "Location API status:",
  //   response.status
  // );

  // If the response is not ok, throw an error.
  if (!response.ok) {
    throw new Error(
      "Unable to search locations"
    );
  }

  // Parse the response body as a location search response.
  const data: unknown = await response.json();

  // console.log(
  //   "Location API response:",
  //   data
  // );

  // Parse the response body as a location search response.
  const result = locationSearchResponseSchema.parse(data);

  // console.log(
  //   "Parsed locations:",
  //   result
  // );

  // Parse the response body as a locations array.
  const locations: Location[] = result;

  // Return the locations.
  return locations;
};

/**
 * Get a location by coordinates.
 * @param latitude - The latitude of the location.
 * @param longitude - The longitude of the location.
 * @returns The location.
 */
export async function getLocationByCoordinates(
  latitude: number, 
  longitude: number,
): Promise<Location | null> {
  // Create the search params for the coordinates.
  const searchParams = new URLSearchParams({
    lat: latitude.toString(),
    lng: longitude.toString(),
  });

  // Fetch the location from the route API, using the latitude and longitude coordinates parameters.
  const response = await fetch(
    `/api/locations/reverse?${searchParams.toString()}`
  );

  if (!response.ok) {
    // Throw an error if the request fails.
    throw new Error(
      "Unable to get location by coordinates"
    );
  }

  // Parse the response body as a location response.
  const data: unknown = await response.json();

  try {
    // Parse the response body as a location response.
    const result =
      locationResponseSchema.parse(data);
      
    // Parse the response body as a location.
    const location: Location | null = result;

    // Return the location.
    return location;
  } catch (error) {
    // console.error(
    //   "3. PARSE THREW AN ERROR",
    //   error
    // );
  
    throw error;
  }
};

