import {
  describe,
  expect,
  it,
} from "vitest";

import { getPageStoryIds } from "./get-page-story-ids";

describe("getPageStoryIds", () => {
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

  it("returns the first page of story IDs", () => {
    const result = getPageStoryIds(
      storyIds,
      5,
      0
    );

    expect(result).toEqual([
      101,
      102,
      103,
      104,
      105,
    ]);
  });

  it("returns the second page of story IDs", () => {
    const result = getPageStoryIds(
      storyIds,
      5,
      5
    );

    expect(result).toEqual([
      106,
      107,
      108,
      109,
      110,
    ]);
  });

  it("returns only the remaining IDs on the final page", () => {
    const result = getPageStoryIds(
      storyIds,
      5,
      10
    );

    expect(result).toEqual([
      111,
      112,
    ]);
  });

  it("returns an empty array when the offset is beyond the available IDs", () => {
    const result = getPageStoryIds(
      storyIds,
      5,
      50
    );

    expect(result).toEqual([]);
  });
});