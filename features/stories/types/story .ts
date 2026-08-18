/**
 * Domain model for a story shown in the app.
 * Normalized from a Hacker News item (see `mapHackerNewsStory`).
 */
export interface Story {
  /** Unique story identifier from Hacker News. */
  id: number;
  /** Story headline. */
  title: string;
  /** Username of the submitter. */
  author: string;
  /** Upvote / points count. */
  score: number;
  /** Number of comments on the story. */
  commentCount: number;
  /** When the story was published. */
  publishedAt: Date;
  /** External article link, if the post has one. */
  url?: string;
}
