/**
 * Utility function to get the story engagement data from the analytics overview.
 */
import type {
  StoryMetrics,
} from "../types/analytics";

/**
 * Interface for the story engagement data, used to track the number of stories, 
 * the total score, the total comments, the average score, and the average comments.
 */
export interface StoryEngagementData {
  metric: string;
  value: number;
}

/**
 * Converts the analytics story metrics into an array of story engagement data.
 * @param stories The story metrics to convert.
 * @returns An array of story engagement data.
 */
export function getStoryEngagementData(
  stories: StoryMetrics
): StoryEngagementData[] {
  return [
    {
      metric: "Average Score",
      value: stories.averageScore,
    },
    {
      metric: "Average Comments",
      value: stories.averageComments,
    },
  ];
}