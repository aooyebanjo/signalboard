import {
  describe,
  expect,
  it,
} from "vitest";

import { getPageStoryIds } from "./get-page-story-ids";

/**
 * Tests for the getPageStoryIds function.
 */
describe("getPageStoryIds", () => {
  /**
   * The story IDs to test.
   */
  const storyIds = [
    101,
    102,
    103,
    104,
    105,
    106,
    107,
    108,
    109,
    110,
    111,
    112,
  ];

  /**
   * Returns the first page of story IDs.
   */
  it("returns the first page of story IDs", () => {
    const result = getPageStoryIds(
      storyIds,
      5,
      0
    );

    // Expect the result to be the first page of story IDs
    expect(result).toEqual([
      101,
      102,
      103,
      104,
      105,
    ]);
  });

  /**
   * Returns the second page of story IDs.
   */
  it("returns the second page of story IDs", () => {
    const result = getPageStoryIds(
      storyIds,
      5,
      5
    );

    // Expect the result to be the second page of story IDs
    expect(result).toEqual([
      106,
      107,
      108,
      109,
      110,
    ]);
  });

  /**
   * Returns only the remaining IDs on the final page.
   */
  it("returns only the remaining IDs on the final page", () => {
    const result = getPageStoryIds(
      storyIds,
      5,
      10
    );

    // Expect the result to be the remaining IDs on the final page
    expect(result).toEqual([
      111,
      112,
    ]);
  });

  /**
   * Returns an empty array when the offset is beyond the available IDs.
   */
  it("returns an empty array when the offset is beyond the available IDs", () => {
    // Get the remaining IDs on the final page
    const result = getPageStoryIds(
      storyIds,
      5,
      50
    );

    // Expect the result to be an empty array
    expect(result).toEqual([]);
  });
});