
import type { StoryMetrics } from "../types/analytics";

/**
 * Story Metric Input, describes the input data for calculating story metrics, used to track the score and the number of comments.
 */
export interface StoryMetricInput {
  score: number;
  commentCount: number;
};

/**
 * Calculate Story Metrics, calculates the story metrics for a given array of story metric inputs, 
 * used to track the number of stories, the total score, the total comments, the average score, and the average comments.
 */
export function calculateStoryMetrics(
  stories: StoryMetricInput[]
): StoryMetrics {
  const totals = stories.reduce((accumulator, story) => {
    accumulator.totalStories += story.score;
    accumulator.totalComments += story.commentCount;

    return accumulator;
  },
    {
      totalStories: 0,
      totalComments: 0,
    }
  );

  const totalStories = stories.length;

  return {
    totalStories,
    totalScore: totals.totalStories,
    totalComments: totals.totalComments,
    averageScore: totalStories > 0 ? totals.totalStories / totalStories : 0,
    averageComments: totalStories > 0 ? totals.totalComments / totalStories : 0,
  }
};
