
import type { Location } from "../types/location";
import type { GeoapifyLocation } from "../schemas/geoapify-location.schema";

/**
 * Maps a Geoapify location to a location.
 */
export function mapGeoapifyLocation(
  location: GeoapifyLocation,
): Location {
  // Map the Geoapify location to a location.
  return {
    // Unique identifier for the location. (place_id)
    id: location.place_id,

    // Name of the location. (name or city or formatted)
    name: location.name ?? location.city ?? location.formatted,

    // Display name of the location. (formatted)
    displayName: location.formatted,

    // Latitude and longitude of the location. (lat and lon)
    latitude: location.lat,
    longitude: location.lon,

    // City of the location. (city)
    city: location.city,
    // State of the location. (state)
    state: location.state,

    // Country of the location. (country)
    country: location.country,
    // Country code of the location. (countryCode)
    countryCode: location.country_code.toUpperCase(),
  };
};

