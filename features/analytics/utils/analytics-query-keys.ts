
/**
 * Analytics Query Keys, a utility for managing analytics query keys, used to create and manage query keys for the analytics API.
 */
export const analyticsQueryKeys = {
  /**
   * All, the base query key for all analytics queries.
   */
  all: ["analytics"] as const,

  /**
   * Overview, the query key for the analytics overview query.
   */
  overivew: (username: string) => [
    ...analyticsQueryKeys.all,
    "overview",
    username.trim().toLowerCase(),
  ] as const,
};
