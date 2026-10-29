import {
  describe,
  expect,
  it,
} from "vitest";

import {
  render,
  screen,
  within,
} from "@testing-library/react";

import {
  StoryEngagementChart,
} from "./story-engagement-chart";

import type {
  StoryMetrics,
} from "../types/analytics";

describe("StoryEngagementChart", () => {
  const stories: StoryMetrics = {
    totalStories: 20,
    totalScore: 2301,
    totalComments: 1021,
    averageScore: 115.05,
    averageComments: 51.05,
  };

  it("renders the chart heading", () => {
    render(
      <StoryEngagementChart stories={stories} />
    );

    expect(
      screen.getByRole("heading", {
        name: /hacker news engagement/i,
      })
    ).toBeInTheDocument();
  });

  it("renders the engagement breakdown", () => {
    render(
      <StoryEngagementChart stories={stories} />
    );

    const table = screen.getByRole("table");

    expect(
      within(table).getByRole("rowheader", {
        name: "Average Score",
      })
    ).toBeInTheDocument();

    expect(
      within(table).getByRole("cell", {
        name: "115.05",
      })
    ).toBeInTheDocument();

    expect(
      within(table).getByRole("cell", {
        name: "51.05",
      })
    ).toBeInTheDocument();
  });

  it("shows an empty state when no stories exist", () => {
    render(
      <StoryEngagementChart
        stories={{
          totalStories: 0,
          totalScore: 0,
          totalComments: 0,
          averageScore: 0,
          averageComments: 0,
        }}
      />
    );

    expect(
      screen.getByRole("status")
    ).toHaveTextContent(
      /no hacker news engagement data available/i
    );
  });
});