
/**
 * React test suite for the AnalyticsDashboard component.
 */
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";

/**
 * Import testing utilities for React components.
 */
import {
  fireEvent,
  render,
  screen,
} from "@testing-library/react";

/**
 * Import the AnalyticsDashboard component.
 */
import {
  AnalyticsDashboard
} from "./analytics-dashboard";

/**
 * Import the useAnalytics hook.
 */
import {
  useAnalytics,
} from "../hooks/use-analytics";

/**
 * Import the analytics fixture.
 */
import {
  analyticsFixture,
} from "../test/analytics-fixtures";

/**
 * Import the unknown type from zod.
 */
import { unknown } from "zod";

/**
 * Mock the useAnalytics hook.
 */
vi.mock(
  "../hooks/use-analytics",
  () => ({
    useAnalytics: vi.fn(),
  })
);

/**
 * Mock the AnalyticsOverview component.
 */
vi.mock(
  './analytics-overview',
  () => ({
    AnalyticsOverview: ({
      analytics,
    }: {
      analytics: typeof analyticsFixture
    }) => (
      <div data-testid="analytics-overview">
        {analytics.scope.username}
      </div>
    ),
  }),
);

/**
 * Type guard for the mocked useAnalytics hook.
 */
const mockedUseAnalytics = vi.mocked(useAnalytics);

/**
 * Test suite for the AnalyticsDashboard component.
 */
describe("AnalyticsDashboard", () => {
  /**
   * Clear mocks before each test.
   */
  beforeEach(() => {
    vi.clearAllMocks();
  });

  /**
   * Test case for rendering the loading state.
   */
  it("renders the loading state", () => {
    /**
     * Mock the useAnalytics hook.
     */
    mockedUseAnalytics.mockReturnValue({
      isPending: true,
      isError: false,
      isFetching: true,
      data: undefined,
    } as ReturnType<typeof useAnalytics>);

    /**
     * Render the AnalyticsDashboard component.
     */
    render(
      <AnalyticsDashboard
        username="octocat"
      />
    );

    /**
     * Assert that the loading state is rendered.
     */
    expect(
      screen.getByRole("status")
    ).toHaveTextContent(
      /loading analytics/i
    );
  });

  /**
   * Test case for rendering the analytics overview on success.
   */
  it("renders the analytics overview on success", () => {
    /**
     * Mock the useAnalytics hook.
     */
    mockedUseAnalytics.mockReturnValue({
      isPending: false,
      isError: false,
      isFetching: false,
      data: analyticsFixture,
    } as ReturnType<typeof useAnalytics>);

    /**
     * Render the AnalyticsDashboard component.
     */
    render(
      <AnalyticsDashboard
        username="octocat"
      />
    );

    /**
     * Assert that the analytics overview is rendered.
     */
    expect(
      screen.getByTestId("analytics-overview")
    ).toHaveTextContent("octocat");
  });

  /**
   * Test case for rendering an error and allowing retry.
   */
  it("renders an error and allows retry", () => {
    /**
     * Mock the refetch function.
     */
    const refetch = vi.fn();

    /**
     * Mock the useAnalytics hook.
     */
    mockedUseAnalytics.mockReturnValue({
      isPending: false,
      isError: true,
      isFetching: false,
      error: new Error("Network unavailable"),
      data: undefined,
      refetch,
    } as unknown as ReturnType<typeof useAnalytics>);

    /**
     * Render the AnalyticsDashboard component.
     */
    render(
      <AnalyticsDashboard
        username="octocat"
      />
    );

    /**
     * Assert that the error message is rendered.
     */
    expect(
      screen.getByRole("alert")
    ).toHaveTextContent(
      /network unavailable/i
    );

    /**
     * Click the retry button.
     */
    fireEvent.click(
      screen.getByRole("button",
        {
          name: /try again/i
        })
    );

    /**
     * Assert that the refetch function was called.
     */
    expect(refetch).toHaveBeenCalledTimes(1)
  });

  /**
   * Test case for showing a background refresh message.
   */
  it("shows a background refresh message", () => {
    /**
     * Mock the useAnalytics hook.
     */
    mockedUseAnalytics.mockReturnValue({
      isPending: false,
      isError: false,
      isFetching: true,
      data: analyticsFixture,
    } as ReturnType<typeof useAnalytics>);

    render(
      <AnalyticsDashboard
        username="octocat"
      />
    );

    /**
     * Assert that the background refresh message is rendered.
     */
    expect(
      screen.getByRole("status")
    ).toHaveTextContent(
      /refetching analysis/i
    );
  });

  /**
   * Test case for allowing the user to refresh the analytics.
   */
  it("allows refreshing successful analytics", () => {
    /**
     * Mock the refetch function.
     */
    const refetch = vi.fn();

    /**
     * Mock the useAnalytics hook.
     */
    mockedUseAnalytics.mockReturnValue({
      isPending: false,
      isError: false,
      isFetching: false,
      data: analyticsFixture,
      refetch,
    } as unknown as ReturnType<typeof useAnalytics>);

    /**
     * Render the AnalyticsDashboard component.
     */
    render(
      <AnalyticsDashboard username="octocat" />
    );

    /**
     * Click the refresh button.
     */
    fireEvent.click(
      screen.getByRole("button", {
        name: /refresh analysis/i,
      })
    );

    /**
     * Assert that the refetch function was called.
     */
    expect(refetch).toHaveBeenCalledTimes(1);
  });

  /**
   * Test case for disabling the refresh button while fetching.
   */
  it("disables refresh while fetching", () => {
    /**
     * Mock the useAnalytics hook.
     */
    mockedUseAnalytics.mockReturnValue({
      isPending: false,
      isError: false,
      isFetching: true,
      data: analyticsFixture,
    } as ReturnType<typeof useAnalytics>);

    /**
     * Render the AnalyticsDashboard component.
     */
    render(
      <AnalyticsDashboard username="octocat" />
    );

    /**
     * Assert that the refresh button is disabled.
     */
    expect(
      screen.getByRole("button", {
        name: /refreshing/i,
      })
    ).toBeDisabled();
  });
});
