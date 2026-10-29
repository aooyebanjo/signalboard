
import { describe, expect, it } from "vitest";

import { calculateLanguageDistribution } from "./calculate-language-distribution";

/**
 * Test Suite for the Calculate Language Distribution function, used to test the functionality of the function.
 */
describe("CalculateLanguageDistribution", () => {
  /**
   * This test case verifies that the function correctly groups repositories by primary language.
   */
  it("groups repositories by primary language", () => {
    const repositories = [
      { language: "TypeScript" },
      { language: "JavaScript" },
      { language: "TypeScript" },
      { language: "Python" },
      { language: "TypeScript" },
    ];

    const languageDistribution = calculateLanguageDistribution(repositories);

    expect(languageDistribution).toEqual([
      { language: "TypeScript", count: 3 },
      { language: "JavaScript", count: 1 },
      { language: "Python", count: 1 },
    ]);
  });

  /**
   * This test case verifies that the function correctly ignores repositories without a language.
   */
  it("ignores repositories without a languaage", () => {
    const repositories = [
      { language: "TypeScript" },
      { language: null },
      { language: "JavaScript" },
    ];

    const languageDistribution = calculateLanguageDistribution(repositories);

    expect(languageDistribution).toEqual([
      { language: "TypeScript", count: 1 },
      { language: "JavaScript", count: 1 },
    ]);
  });

  /**
   * This test case verifies that the function correctly returns an empty array for no repositories.
   */
  it("returns an empty array for no repositories", () => {
    const languageDistribution = calculateLanguageDistribution([]);

    expect(languageDistribution).toEqual([]);
  });

  /**
   * This test case verifies that the function does not mutate the input array of repository language inputs.
   */
  it("does not mutate the input calculation", () => {
    const repositories = [
      { language: "JavaScript" },
      { language: "TypeScript" },
    ];

    const original = structuredClone(repositories);

    calculateLanguageDistribution(repositories);

    expect(repositories).toEqual(original);
  });
});
