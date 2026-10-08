/**
 * A location is a point on the earth's surface.
 */
export interface Location {
  // Unique identifier for the location.
  id: string;
  // Name of the location.
  name: string;
  // Display name of the location.
  displayName: string;

  // Latitude and longitude of the location.
  latitude: number;
  longitude: number;

  // City of the location.
  city?: string;
  // State of the location.
  state?: string;
  // Country of the location.
  country: string;
  // Country code of the location.
  countryCode: string;
}
