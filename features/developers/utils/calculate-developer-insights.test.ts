import { describe, expect, it, } from "vitest";

import { calculateDeveloperInsights } from "@/features/developers/utils/calculate-developer-insights";
import type { Repository } from "@/features/developers/types/repository";

/**
 * This is a test data for the calculateDeveloperInsights function.
 * It contains a list of repositories with different languages, stars, forks, and other properties.
 * It is used to test the calculateDeveloperInsights function.
 */
const repositories: Repository[] = [
  {
    id: 1,
    name: "alpha",
    fullName: "alpha/alpha",
    url: "https://github.com/test/alpha",
    description: "Alpha repository",
    language: "TypeScript",
    stars: 20,
    forks: 4,
    isFork: false,
    isArchived: false,
    createdAt: new Date("2026-01-01T00:00:00.000Z"),
    updatedAt: new Date("2026-02-01T00:00:00.000Z"),
    pushedAt: new Date("2026-02-01T00:00:00.000Z"),
  },
  {
    id: 2,
    name: "beta",
    fullName: "test/beta",
    url: "https://github.com/test/beta",
    language: "JavaScript",
    stars: 50,
    forks: 10,
    isFork: false,
    isArchived: false,
    createdAt: new Date("2026-01-02T00:00:00.000Z"),
    updatedAt: new Date("2026-02-02T00:00:00.000Z"),
    pushedAt: new Date("2026-02-02T00:00:00.000Z"),
  },
  {
    id: 3,
    name: "gamma",
    fullName: "test/gamma",
    url: "https://github.com/test/gamma",
    language: "TypeScript",
    stars: 10,
    forks: 2,
    isFork: false,
    isArchived: false,
    createdAt: new Date("2026-01-03T00:00:00.000Z"),
    updatedAt: new Date("2026-02-03T00:00:00.000Z"),
    pushedAt: new Date("2026-02-03T00:00:00.000Z"),
  },
];

/**
 * This is a test suite for the calculateDeveloperInsights function.
 * It contains tests for the calculateDeveloperInsights function.
 * It is used to test the calculateDeveloperInsights function.
 */
describe("Calculate Developer Insights", () => {
  /**
   * This test checks if the calculateDeveloperInsights function calculates the total repositories, stars, and forks correctly.
   */
  it("calculate repository totals", () => {
    const result = calculateDeveloperInsights(repositories);

    expect(result.totalRepositories).toBe(repositories.length);

    expect(result.totalStars).toBe(80);

    expect(result.totalForks).toBe(16);
  });

  /**
   * This test checks if the calculateDeveloperInsights function finds the most starred repository correctly.
   */
  it("finds the most starred repository", () => {
    const result = calculateDeveloperInsights(repositories);

    expect(result.mostStarredRepository).toEqual({
      name: 'beta',
      url: 'https://github.com/test/beta',
      stars: 50,
    });
  });

  /**
   * This test checks if the calculateDeveloperInsights function counts repository languages and sorts them by frequenct correctly.
   */
  it("counts repository languages and sorts them by frequenct", () => {
    const result = calculateDeveloperInsights(repositories);

    expect(result.languages).toEqual([
      {
        language: 'TypeScript',
        count: 2,
      },
      {
        language: 'JavaScript',
        count: 1,
      },
    ]);
  });

  /**
   * This test checks if the calculateDeveloperInsights function ignores repositories without a language correctly.
   */
  it("ignores repositories without a language", () => {
    const repositoriesWithNoLanguage: Repository[] = [
      ...repositories,
      {
        id: 4,
        name: "delta",
        fullName: "test/delta",
        url: "https://github.com/test/delta",
        stars: 5,
        forks: 1,
        isFork: false,
        isArchived: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        pushedAt: new Date(),
      },
    ];

    const result = calculateDeveloperInsights(repositoriesWithNoLanguage);

    expect(result.languages).toEqual([
      {
        language: "TypeScript",
        count: 2,
      },
      {
        language: "JavaScript",
        count: 1,
      },
    ]);
  });

  /**
   * This test checks if the calculateDeveloperInsights function handles an empty repository array correctly.
   */
  it("handles an empty repository array", () => {
    const result = calculateDeveloperInsights([]);

    expect(result).toEqual({
      totalRepositories: 0,
      totalStars: 0,
      totalForks: 0,
      mostStarredRepository: undefined,
      languages: [],
      recentlyUpdatedRepositories: [],
    });
  });

  /**
   * This test checks if the calculateDeveloperInsights function returns the three most recently pushed repositories correctly.
   */
  it("returns the three most recently pushed repositories", () => {
    const result =
      calculateDeveloperInsights(
        repositories
      );
  
    expect(
      result.recentlyUpdatedRepositories.map(
        (repository) =>
          repository.name
      )
    ).toEqual([
      "gamma",
      "beta",
      "alpha",
    ]);
  });

  /**
   * This test checks if the calculateDeveloperInsights function does not mutate the original repository order correctly.
   */
  it("does not mutate the original repository order", () => {
    const originalOrder =
      repositories.map(
        (repository) =>
          repository.name
      );
  
    calculateDeveloperInsights(
      repositories
    );
  
    expect(
      repositories.map(
        (repository) =>
          repository.name
      )
    ).toEqual(originalOrder);
  });
});
