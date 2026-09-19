/**
 * @description Developer query keys
 */
export const developerQueryKeys = {
  // The base key for all developer queries
  all: ["developers"] as const,

  // The key for all developer details queries
  details: () => [
    ...developerQueryKeys.all, 
    "details"
  ] as const,

  // The key for a specific developer details query
  detail: (username: string) => [
    ...developerQueryKeys.details(), 
    username.toLowerCase()
  ] as const,

  // The key for a specific developer insights query
  insights: (username: string) => [
    ...developerQueryKeys.detail(username),
    "insights"
  ] as const, 
};
