import "server-only";

import { GeoapifyLocation, geoapifyLocationSchema, geoapifyLocationsSchema } from "../schemas/geoapify-location.schema";

import { mapGeoapifyLocation } from "../utils/map-geoapify-location";

import { Location } from "../types/location";

/**
 * The URL for the Geoapify API.
 */
const GEOAPIFY_AUTOCOMPLETE_URL  = "https://api.geoapify.com/v1/geocode/autocomplete";

/**
 * The URL for the Geoapify reverse geocoding API.
 */
const GEOAPIFY_REVERSE_GEOCODING_URL = "https://api.geoapify.com/v1/geocode/reverse";

/**
 * Searches for locations using the Geoapify API.
 * @param query - The query to search for.
 * @returns The locations found.
 */
export async function searchGeoapifyLocations(
  query: string,
): Promise<Location[]> {
  // Get the API key from the environment variables.
  const apiKey: string | null | undefined = process.env.GEOAPIFY_API_KEY;

  if (!apiKey) {
    // Throw an error if the API key is not configured.
    throw new Error(
      "GEOAPIFY_API_KEY is not configured"
    );
  }

  // Create the search parameters for the API request.
  const searchParams = new URLSearchParams({
    apiKey,
    text: query,
    format: "json",
    limit: "5",
  });

  // Fetch the locations from the Geoapify API.
  const response = await fetch(`${GEOAPIFY_AUTOCOMPLETE_URL}?${searchParams.toString()}`);

  if (!response.ok) {
    // Throw an error if the request fails.
    throw new Error(
      `Geoapify request failed: ${response.status}`
    );
  }

  // Parse the response body as a Geoapify location.
  const data: unknown = await response.json();

  // Parse the response body as a Geoapify response.
  const geoapiyResponse = geoapifyLocationsSchema.parse(data);

  if (!geoapiyResponse) {
    // Throw an error if the response is not found.
    throw new Error(
      "No locations found for the given query"
    );
  }

  // Parse the response body as a Geoapify locations array.
  const geoapifyLocations: GeoapifyLocation[] = geoapiyResponse.results;

  // Map the Geoapify locations transformations to locations.
  const locations: Location[] = geoapifyLocations.map(geoapifyLocation => mapGeoapifyLocation(geoapifyLocation))

  // Return the locations.
  return locations;
};

/**
 * Reverse geocodes a location using the Geoapify API.
 * @param latitude - The latitude of the location.
 * @param longitude - The longitude of the location.
 * @returns The location.
 */
export async function reverseGeocodeLocation (
  latitude: number, 
  longitude: number,
): Promise<Location | null> {
  // Get the API key from the environment variables.
  const apiKey: string | null | undefined = process.env.GEOAPIFY_API_KEY;

  if (!apiKey) {
    // Throw an error if the API key is not configured.
    throw new Error(
      "GEOAPIFY_API_KEY is not configured"
    );
  }

  // Create the search parameters for the API request, used to reverse geocode the location.
  const searchParams = new URLSearchParams({
    apiKey,
    lat: latitude.toString(),
    lon: longitude.toString(),
    format: "json",
  });

  // Fetch the location from the Geoapify API, using the reverse geocoding API.
  const response = await fetch(
    `${GEOAPIFY_REVERSE_GEOCODING_URL}?${searchParams.toString()}`
  );

  if (!response.ok) {
    // Throw an error if the request fails.
    throw new Error(
      `Geoapify reverse geocoding request failed: ${response.status}`
    );
  }

  // Parse the response body as a Geoapify location.
  const data: unknown = await response.json()

  // Parse the response body as a Geoapify location.
  const geoapifyResponse = geoapifyLocationsSchema.parse(data);

  // Get the first location from the response.
  const geoapifyLocation = geoapifyResponse.results[0];

  if (!geoapifyLocation) {
    // Return null if the location is not found.
    return null;
  }

  // Map the Geoapify location to a location.
  const location: Location = mapGeoapifyLocation(geoapifyLocation);

  // Return the location.
  return location;
};
