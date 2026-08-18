import { z } from "zod";

/**
 * Zod schema for a raw Hacker News item payload from the Firebase API.
 * Used to validate responses before mapping into our domain `Story` type.
 */
export const hackerNewsStorySchema = z.object({
  /** Unique item ID. */
  id: z.number(),
  /** Submitter username. */
  by: z.string(),
  /** Story title. */
  title: z.string(),
  /** Upvote / points count. */
  score: z.number(),
  /** Unix timestamp in seconds. */
  time: z.number(),
  /** Comment count; may be absent on some items. */
  descendants: z.number().optional(),
  /** External article URL, if present. */
  url: z.string().optional(),
  /** Child comment IDs. */
  kids: z.array(z.number()).optional(),
  /** Item kind (e.g. "story", "job", "poll"). */
  type: z.string(),
});

/** Inferred TypeScript type for a validated Hacker News story item. */
export type HackerNewsStory = z.infer<
  typeof hackerNewsStorySchema
>;
