
import { describe, expect, it } from 'vitest';

import { calculateDeveloperMetrics } from './calculate-developer-metrics';

/**
 * Test Suite for the Calculate Developer Metrics function, used to test the functionality of the function.
 */
describe("CalculateDeveloperMetrics", () => {
  /**
   * This test case verifies that the function correctly calculates the totals for a given array of repository metric inputs.
   */
  it("calculates repository totals", () => {
    const repositories = [
      {
        stars: 120,
        forks: 25,
      },
      {
        stars: 85,
        forks: 12,
      },
      {
        stars: 60,
        forks: 10,
      },
    ];

    expect(
      calculateDeveloperMetrics(repositories)
    ).toEqual({
      totalRepositories: 3,
      totalStars: 265,
      totalForks: 47,
    });
  });

  /**
   * This test case verifies that the function correctly handles an empty collection of repository metric inputs.
   */
  it("handles an empty repsoitory collection", () => {
    expect(
      calculateDeveloperMetrics([])
    ).toEqual({
      totalRepositories: 0,
      totalStars: 0,
      totalForks: 0,
    });
  });

  /**
   * This test case verifies that the function does not mutate the input array of repository metric inputs.
   */
  it("does not mutate repository data", () => {
    const repositories = [
      {
        stars: 100,
        forks: 20,
      },
    ];

    const original = structuredClone(repositories);

    calculateDeveloperMetrics(repositories);

    expect(repositories).toEqual(original);
  });
});

