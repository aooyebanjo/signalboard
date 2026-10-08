/**
 * A set of query keys for the locations feature.
 */
export const locationQueryKeys = {
  // A query key for all locations.
  all: ["locations"] as const,

  // A query key for the locations search.
  searches: () => [
    ...locationQueryKeys.all, 
    "search",
  ] as const,

  // A query key for the locations search by query.
  search: (query: string) => [
    ...locationQueryKeys.searches(), 
    query.trim().toLowerCase(),
  ] as const,

  // A query key for the location by coordinates.
  location: (
    latitude: number | null,
    longitude: number | null,
  ) =>
    [
      ...locationQueryKeys.all,
      "coordinates",
      latitude,
      longitude,
    ] as const,
};

