
import { describe, expect, it } from "vitest";

import { NextRequest } from "next/server";

import { GET } from "./route";

import { vi } from "vitest";

import { getTopStories } from "@/features/stories/api/hacker-news";

import {
  getAllGitHubRepositories,
} from "@/features/developers/api/github";

vi.mock("@/features/stories/api/hacker-news", () => ({
  getTopStories: vi.fn(),
}));

vi.mock("@/features/developers/api/github", () => ({
  getAllGitHubRepositories: vi.fn(),
}));

/**
 * Test suite for the analytics API, used to validate the analytics endpoint.
 */
describe("GET /api/analytics", () => {
  /**
   * Test case for a missing username, used to validate the analytics endpoint.
   */
  it("rejects a missing username", async () => {
    const request = new NextRequest(
      "http://localhost:3000/api/analytics",
    );

    const response = await GET(request);

    expect(response.status).toBe(400);

    const body = await response.json();

    expect(body.error.code).toBe(
      "INVALID_QUERY_PARAMETERS",
    );
  });

  /**
   * Test case for an invalid username, used to validate the analytics endpoint.
   */
  it("rejects an invalid username", async () => {
    const request = new NextRequest(
      "https://localhost:3000/api/analytics?username=invalid_user",
    );

    const response = await GET(request);

    expect(response.status).toBe(400);
  });

  /**
   * Test case for a valid username, used to validate the analytics endpoint.
   */
  it("accepts a valid username", async () => {
    vi.mocked(getTopStories).mockResolvedValueOnce([]);

    vi.mocked(getAllGitHubRepositories)
      .mockResolvedValueOnce([]);

    const request = new NextRequest(
      "http://localhost:3000/api/analytics?username=octocat"
    );

    const response = await GET(request);

    expect(response.status).toBe(200);

    const body = await response.json();

    expect(body.data).toMatchObject({
      stories: {
        totalStories: 0,
        totalScore: 0,
        totalComments: 0,
        averageScore: 0,
        averageComments: 0,
      },
      developers: {
        totalRepositories: 0,
        totalStars: 0,
        totalForks: 0,
      },
      languages: [],
      scope: {
        username: "octocat",
        storySampleSize: 0,
        repositorySampleSize: 0,
      },
    });

    expect(body.data.scope.generatedAt)
      .toEqual(expect.any(String));

    expect(getTopStories).toHaveBeenCalledWith(20);

    expect(getAllGitHubRepositories)
      .toHaveBeenCalledWith("octocat");
  });
});

