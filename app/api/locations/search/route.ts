
import { z } from "zod";

import { searchGeoapifyLocations } from "@/features/locations/api/geoapify";

import { Location } from "@/features/locations/types/location";

import { createApiErrorResponse, ApiErrorCode } from "@/lib/api-error";

/**
 * The schema for the query search.
 */
const querySearch = z.object({
  q: z.string().trim().min(2).max(100),
});

/**
 * The GET handler for the location search endpoint.
 * @param request - The request object.
 * @returns The response object.
 */
export async function GET(
  request: Request,
): Promise<Response | undefined> {
  // Get the search parameters from the URL.
  const { searchParams } = new URL(request.url);

  // Parse the search parameters.
  const result = querySearch.safeParse({
    q: searchParams.get("q"),
  });

  if (!result.success) {
    // Return a bad request response if the search parameters are invalid.
    return createApiErrorResponse(
      "INVALID_LOCATION_QUERY" as ApiErrorCode,
      "Location search must contain between 2 and 100 characters.",
      400
    );
  }

  try {
    // Search for the locations.
    const locations: Location[] = await searchGeoapifyLocations(
      result.data.q
    );

    // Return the locations.
    return Response.json(
      locations
    );
  }
  catch (error) {
    // Log the error.
    console.error(
      "Location search failed:", 
      error
    );

    // Return a service unavailable response if the location search fails.
    return createApiErrorResponse(
      "LOCATION_SEARCH_UNAVAILABLE" as ApiErrorCode,
      "Location search is currently unavailable.",
      502
    );
  }
};

