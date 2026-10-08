
import { reverseGeocodeLocation } from "@/features/locations/api/geoapify";

import { createApiErrorResponse, ApiErrorCode } from "@/lib/api-error";

import { Location } from "@/features/locations/types/location";

/**
 * The GET handler for the location reverse geocoding endpoint.
 * @param request - The request object.
 * @returns The response object.
 */
export async function GET(
  request: Request,
): Promise<Response | undefined> {
  // Get the search parameters from the URL.
  const { searchParams } = new URL(request.url);

  // Get the latitude from the search parameters.
  const latitudeParam: string | null =
    searchParams.get("lat");

  // Get the longitude from the search parameters.
  const longitudeParam: string | null =
    searchParams.get("lng");

  if (
    latitudeParam === null ||
    longitudeParam === null
  ) {
    // Return a bad request response if the latitude or longitude is not provided.
    return createApiErrorResponse(
      "INVALID_LOCATION_QUERY",
      "Latitude and longitude are required.",
      400
    );
  }

  // Parse the latitude as a number from latitude parameter.
  const latitude: number = Number(latitudeParam);

  // Parse the longitude as a number from longitude parameter.
  const longitude: number = Number(longitudeParam);

  if (
    !Number.isFinite(latitude) || 
    !Number.isFinite(longitude) || 
    latitude < -90 ||
    latitude > 90 ||
    longitude < -180 ||
    longitude > 180
  ) {
    // Return a bad request response if the latitude or longitude is not a valid number or is out of range.
    return createApiErrorResponse(
      "INVALID_LOCATION_COORDINATES" as ApiErrorCode,
      "Latitude and Longitude are both required and must be valid numbers.",
      400
    );
  }

  try {
    // Reverse geocode the location.
    const location: Location | null = await reverseGeocodeLocation(latitude, longitude);

    // Return the location.
    return Response.json(location);
  }
  catch (error) {
    // Return an internal server error response if the reverse geocoding fails.
    return createApiErrorResponse(
      "LOCATION_SEARCH_UNAVAILABLE" as ApiErrorCode,
      "Location search is currently unavailable.",
      500
    );
  }
};
