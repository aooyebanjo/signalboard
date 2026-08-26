import { describe, expect, it } from "vitest";

import { mapHackerNewsStory } from "./map-hacker-news-story";
import type { HackerNewsStory } from "../schemas/hacker-news-story.schema";

/**
 * Tests for the mapHackerNewsStory function.
 */
describe("mapHackerNewsStory", () => {
  /**
   * Maps a Hacker News story into a SignalBoard Story object,
   * including the comment count.
   */
  it("maps a Hacker News story into a SignalBoard Story", () => {
    const hackerNewsStory: HackerNewsStory = {
      id: 12345,
      by: "alice",
      title: "An interesting technology story",
      score: 350,
      time: 1_700_000_000,
      descendants: 42,
      url: "https://example.com",
      type: "story",
    };

    // Map the Hacker News story into a SignalBoard Story object
    const result =
      mapHackerNewsStory(hackerNewsStory);

    // Expect the result to be a SignalBoard Story object with the correct properties
    expect(result).toEqual({
      id: 12345,
      title: "An interesting technology story",
      author: "alice",
      score: 350,
      commentCount: 42,
      publishedAt: new Date(
        1_700_000_000 * 1000
      ),
      url: "https://example.com",
    });
  });

  /**
   * Uses zero comments when descendants is missing.
   */
  it("uses zero comments when descendants is missing", () => {
    const hackerNewsStory: HackerNewsStory = {
      id: 12345,
      by: "alice",
      title: "Ask HN",
      score: 100,
      time: 1_700_000_000,
      type: "story",
    };

    // Map the Hacker News story into a SignalBoard Story object
    const result =
      mapHackerNewsStory(hackerNewsStory);
    
    // Expect the result to be a SignalBoard Story object with the correct properties
    expect(result.commentCount).toBe(0);
  });
});