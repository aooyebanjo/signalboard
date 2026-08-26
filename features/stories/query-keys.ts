/**
 * Query keys for the stories API.
 */
export const storyQueryKeys = {
  // All stories
  all: ['stories'] as const,

  // List of stories with no limit
  lists: () => [...storyQueryKeys.all, 'list'] as const,

  // List of stories with a limit
  list: (limit: number) => [...storyQueryKeys.lists(), { limit }] as const,

  // Detail of a story
  details: () => [...storyQueryKeys.all, 'details'] as const,

  // Detail of a story with an id
  detail: (id: number) => [...storyQueryKeys.details(), { id }] as const,
};
