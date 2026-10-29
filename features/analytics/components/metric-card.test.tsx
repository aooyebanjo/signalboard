
/**
 * Mock implementation of the MetricCard component for testing.
 */
import {
  describe,
  expect,
  it,
} from "vitest";

/**
 * Imports from @testing-library/react.
 */
import {
  render,
  screen,
} from "@testing-library/react";

/**
 * Imports the MetricCard component for testing.
 */
import { MetricCard } from "./metric-card";


/**
 * Test suite for the MetricCard component.
 */
describe("Metric Card", () => {
  /**
   * Test case for the MetricCard component, 
   * verifies that the component renders the title and numeric value.
   */
  it("renders the title and numeric value", () => {
    render(
      <MetricCard
        title="Total Stars"
        value={22341}
      />
    );

    expect(
      screen.getByText("Total Stars")
    ).toBeInTheDocument();

    expect(
      screen.getByText("22,341")
    ).toBeInTheDocument();
  });

  /**
   * Test case for the MetricCard component, 
   * verifies that the component renders an optional description.
   */
  it("renders an optional description", () => {
    render(
      <MetricCard
        title="Repositories"
        value={8}
        description="8 respositories retrieved"
      />
    );

    expect(
      screen.getByText("8 respositories retrieved")
    ).toBeInTheDocument();
  });

  /**
   * Test case for the MetricCard component, 
   * verifies that the component renders without optional props.
   */
  it("renders without optional props", () => {
    render(
      <MetricCard
        title="Total Comments"
        value={1021}
      />
    );

    expect(
      screen.getByText("1,021")
    ).toBeInTheDocument();
  });
});

