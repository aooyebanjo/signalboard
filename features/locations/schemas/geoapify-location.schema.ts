
import { z } from "zod";

/**
 * A schema for a location returned by the Geoapify API on the Server.
 */
export const geoapifyLocationSchema = z.object({
  // Unique identifier for the location.
  place_id: z.string(),

  // Name of the location.
  name: z.string().optional(),
  // Display name of the location.
  formatted: z.string(),

  // Latitude of the location.
  lat: z.number(),
  // Longitude of the location.
  lon: z.number(),

  // City of the location.
  city: z.string().optional(),
  // State of the location.
  state: z.string().optional(),

  // Country of the location.
  country: z.string(),
  // Country code of the location.
  country_code: z.string(),
});

/**
 * A schema for the locations returned by the Geoapify API on the Server.
 */
export const geoapifyLocationsSchema = z.object({
  results: z.array(
    geoapifyLocationSchema
  ),
});

/**
 * A type for a location returned by the Geoapify API on the Server.
 */
export type GeoapifyLocation = z.infer<typeof geoapifyLocationSchema>;