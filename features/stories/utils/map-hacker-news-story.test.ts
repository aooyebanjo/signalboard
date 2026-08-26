import { describe, expect, it } from "vitest";

import { mapHackerNewsStory } from "./map-hacker-news-story";
import type { HackerNewsStory } from "../schemas/hacker-news-story.schema";

describe("mapHackerNewsStory", () => {
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

    const result =
      mapHackerNewsStory(hackerNewsStory);

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

  it("uses zero comments when descendants is missing", () => {
    const hackerNewsStory: HackerNewsStory = {
      id: 12345,
      by: "alice",
      title: "Ask HN",
      score: 100,
      time: 1_700_000_000,
      type: "story",
    };
  
    const result =
      mapHackerNewsStory(hackerNewsStory);
  
    expect(result.commentCount).toBe(0);
  });
});