import { z } from "zod";

/**
 * A schema for a location response on the Client.
 */
export const locationSchema = z.object({
  // Unique identifier for the location.
  id: z.string(),
  // Name of the location.
  name: z.string(),
  // Display name of the location.
  displayName: z.string(),

  // Latitude of the location.
  latitude: z.number(),
  // Longitude of the location.
  longitude: z.number(),

  // City of the location.
  city: z.string().optional(),
  // State of the location.
  state: z.string().optional(),

  // Country of the location.
  country: z.string(),
  // Country code of the location.
  countryCode: z.string(),
});

/**
 * A schema for a location search response on the Client.
 */
export const locationSearchResponseSchema = z.array(locationSchema);

/**
 * A schema for the location response on the Client.
 */
export const locationResponseSchema = locationSchema.nullable();
