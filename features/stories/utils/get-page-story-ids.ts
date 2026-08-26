export function getPageStoryIds(
  storyIds: number[],
  limit: number,
  offset: number
): number[] {
  return storyIds.slice(
    offset,
    offset + limit
  );
}