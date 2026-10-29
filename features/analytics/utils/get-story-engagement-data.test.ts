import {
  describe,
  expect,
  it,
} from "vitest";

import {
  getStoryEngagementData,
} from "./get-story-engagement-data";

import type {
  StoryMetrics,
} from "../types/analytics";

describe("getStoryEngagementData", () => {
  const stories: StoryMetrics = {
    totalStories: 20,
    totalScore: 2301,
    totalComments: 1021,
    averageScore: 115.05,
    averageComments: 51.05,
  };

  it("transform story metrics into chart data", () => {
    const result = getStoryEngagementData(stories);

    expect(result).toEqual([
      {
        metric: "Average Score",
        value: 115.05,
      },
      {
        metric: "Average Comments",
        value: 51.05,
      },
    ])
  });

  it("does not mutate the original metrics", () => {
    const original = structuredClone(stories);

    getStoryEngagementData(stories);

    expect(stories).toEqual(original);
  });
});