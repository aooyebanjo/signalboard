import type { HackerNewsStory } from "../schemas/hacker-news-story.schema";
import type { Story } from "../types/story .ts";

/**
 * Maps a validated Hacker News API item into our domain `Story` model.
 * Renames HN-specific fields and normalizes optional / timestamp values.
 */
export const mapHackerNewsStory = (story: HackerNewsStory): Story => {
  return {
    id: story.id,
    title: story.title,
    // HN exposes the submitter as `by`.
    author: story.by,
    score: story.score,
    // `descendants` can be missing on some items; treat that as zero comments.
    commentCount: story.descendants ?? 0,
    // HN `time` is a Unix timestamp in seconds; Date expects milliseconds.
    publishedAt: new Date(story.time * 1000),
    // Optional — Ask/Show posts and some items may omit an external URL.
    url: story.url,
  };
};
