
import {
  describe,
  expect,
  it,
  vi,
} from 'vitest';

import {
  render,
  screen,
} from '@testing-library/react';

import {
  AnalyticsOverview,
} from "./analytics-overview";

import {
  emptyAnalyticsFixture,
} from "../test/analytics-fixtures";

vi.mock(
  "./story-engagement-chart",
  () => ({
    StoryEngagementChart: () => (
      <div role="status">
        No Hacker News engagement data available
      </div>
    )
  }),
);

vi.mock(
  "./language-distribution-chart",
  () => ({
    LanguageDistributionChart: () => (
      <div role="status">
        No programming language data available
      </div>
    )
  }),
);


describe("AnalyticsOverview", () => {
  it("renders zero metrics and empty chart states", () => {
    render(
      <AnalyticsOverview
        analytics={emptyAnalyticsFixture}
      />
    );

    expect(
      screen.getByText("Stories Analyzed")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Repositories Analyzed")
    ).toBeInTheDocument();

    expect(
      screen.getByText("No Hacker News engagement data available")
    ).toBeInTheDocument();

    expect(
      screen.getByText("No programming language data available")
    ).toBeInTheDocument();
  });
});


