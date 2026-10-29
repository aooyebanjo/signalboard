
import { describe, expect, it } from 'vitest';

import { calculateStoryMetrics } from './calculate-story-metrics';

/**
 * Test Suite for the Calculate Story Metrics function, used to test the functionality of the function.
 */
describe("CalculateStoryMetrics", () => {
  /**
   * This test case verifies that the function correctly calculates the totals and averages for a given array of story metric inputs.
   */
  it("calculates totals and averages", () => {
    const stories = [
      { score: 120, commentCount: 35 },
      { score: 80, commentCount: 20 },
      { score: 200, commentCount: 60 },
    ];

    const storyMetrics = calculateStoryMetrics(stories);

    expect(storyMetrics).toEqual({
      totalStories: 3,
      totalScore: 400,
      totalComments: 115,
      averageScore: 400 / 3,
      averageComments: 115 / 3,
    });
  });

  /**
   * This test case verifies that the function correctly handles an empty collection of story metric inputs.
   */
  it("handles an empty collection", () => {
    const storyMetrics = calculateStoryMetrics([]);

    expect(storyMetrics).toEqual({
      totalStories: 0,
      totalScore: 0,
      totalComments: 0,
      averageScore: 0,
      averageComments: 0,
    });
  });

  /**
   * This test case verifies that the function does not mutate the input array of story metric inputs.
   */
  it("does not mutate the input", () => {
    const stories = [
      { score: 100, commentCount: 25 }
    ];

    const original = structuredClone(stories);

    calculateStoryMetrics(stories);

    expect(stories).toEqual(original);
  });
});
