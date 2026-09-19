
import { beforeEach, describe, expect, it, vi } from "vitest";

import { GET } from "./route";

import { getGitHubDeveloperInsights } from "@/features/developers/api/github-insights";

import { NotFoundError } from "@/lib/error";

/**
 * This is a mock of the getGitHubDeveloperInsights function.
 * It is used to mock the getGitHubDeveloperInsights function in the route.
 * It returns a resolved promise with the following value:
 */
vi.mock(
  "@/features/developers/api/github-insights",
  () => ({
    getGitHubDeveloperInsights: vi.fn(),
  })
);

/**
 * This is a mock of the getGitHubDeveloperInsights function.
 * It is used to mock the getGitHubDeveloperInsights function in the route.
 * It returns a resolved promise with the following value:
 */
const mockedGetGitHubDeveloperInsights = vi.mocked(getGitHubDeveloperInsights);

/**
 * This is a test suite for the GET /api/developers/[username]/insights route.
 * It contains tests for the route.
 * It is used to test the route.
 */
describe("GET /api/developers/[username]/insights", () => {
  /**
   * This is a beforeEach hook that clears all mocks before each test.
   */
  beforeEach(() => {
    vi.clearAllMocks
  });

  /**
   * This test checks if the route returns developer insights successfully.
   * It mocks the getGitHubDeveloperInsights function to return a resolved promise with the following value:
   * It then makes a request to the route with the username "octocat".
   * It then checks if the response is successful.
   * It then checks if the getGitHubDeveloperInsights function was called with the username "octocat".
   * It then checks if the response body is equal to the expected value.
   */
  it("returns developer insights successfully", async () => {
    /**
     * This is the expected value of the getGitHubDeveloperInsights function.
     * It is used to mock the getGitHubDeveloperInsights function.
     * It is used to test the route.
     */
    mockedGetGitHubDeveloperInsights.mockResolvedValue({
      totalRepositories: 3,
      totalStars: 80,
      totalForks: 16,

      mostStarredRepository: {
        name: 'beta',
        url: 'https://github.com/test/beta',
        stars: 50,
      },

      languages: [
        {
          language: 'TypeScript',
          count: 2,
        },
        {
          language: 'JavaScript',
          count: 1,
        },
      ],

      recentlyUpdatedRepositories: [
        {
          name: "gamma",
          url: "https://github.com/test/gamma",
          pushedAt: new Date(
            "2026-02-03T00:00:00.000Z"
          ),
        },
        {
          name: "beta",
          url: "https://github.com/test/beta",
          pushedAt: new Date(
            "2026-02-02T00:00:00.000Z"
          ),
        },
        {
          name: "alpha",
          url: "https://github.com/test/alpha",
          pushedAt: new Date(
            "2026-02-01T00:00:00.000Z"
          ),
        },
      ],
    });

    /**
     * This is a request to the route with the username "octocat".
     * It is used to test the route.
     */
    const request = new Request("http://localhost:3000/api/developers/octocat/insights");

    /**
     * This is a response from the route with the username "octocat".
     * It is used to test the route.
     */
    const response = await GET(
      request,
      {
        params: Promise.resolve({
          username: 'octocat',
        })
      }
    );

    /**
     * This is the body of the response from the route with the username "octocat".
     * It is used to test the route.
     */
    const body = await response.json();

    /**
     * This is a test that checks if the response is successful.
     * It is used to test the route.
     */
    expect(response.status).toBe(200);

    /**
     * This is a test that checks if the getGitHubDeveloperInsights function was called with the username "octocat".
     * It is used to test the route.
     */
    expect(mockedGetGitHubDeveloperInsights).toHaveBeenCalledWith('octocat');

    /**
     * This is a test that checks if the response body is equal to the expected value.
     * It is used to test the route.
     */
    expect(body).toEqual({
      totalRepositories: 3,
      totalStars: 80,
      totalForks: 16,

      mostStarredRepository: {
        name: "beta",
        url: "https://github.com/test/beta",
        stars: 50,
      },

      languages: [
        {
          language: "TypeScript",
          count: 2,
        },
        {
          language: "JavaScript",
          count: 1,
        },
      ],

      recentlyUpdatedRepositories: [
        {
          name: "gamma",
          url: "https://github.com/test/gamma",
          pushedAt: "2026-02-03T00:00:00.000Z",
        },
        {
          name: "beta",
          url: "https://github.com/test/beta",
          pushedAt: "2026-02-02T00:00:00.000Z",
        },
        {
          name: "alpha",
          url: "https://github.com/test/alpha",
          pushedAt: "2026-02-01T00:00:00.000Z",
        },
      ],
    });
  });

  /**
   * This test checks if the route returns 404 when the developer is not found.
   * It mocks the getGitHubDeveloperInsights function to return a rejected promise with a NotFoundError.
   * It then makes a request to the route with the username "does-not-exist".
   * It then checks if the response is 404.
   * It then checks if the response body is equal to the expected value.
   */
  it("returns 404 when the developer is not found", async () => {
    /**
     * This is a mock of the getGitHubDeveloperInsights function.
     * It is used to mock the getGitHubDeveloperInsights function in the route.
     * It returns a rejected promise with a NotFoundError.
     * It is used to test the route.
     */
    mockedGetGitHubDeveloperInsights
      .mockRejectedValue(
        new NotFoundError(
          "GitHub user was not found"
        )
      );
  
    /**
     * This is a request to the route with the username "does-not-exist".
     * It is used to test the route.
     */
    const request = new Request(
      "http://localhost:3000/api/developers/does-not-exist/insights"
    );
  
    /**
     * This is a response from the route with the username "does-not-exist".
     * It is used to test the route.
     */
    const response = await GET(
      request,
      {
        params: Promise.resolve({
          username: "does-not-exist",
        }),
      }
    );
  
    /**
     * This is the body of the response from the route with the username "does-not-exist".
     * It is used to test the route.
     */
    const body = await response.json();
  
    /**
     * This is a test that checks if the response is 404.
     * It is used to test the route.
     */
    expect(response.status).toBe(404);
  
    /**
     * This is a test that checks if the response body is equal to the expected value.
     * It is used to test the route.
     */
    expect(body).toEqual({
      error: {
        code: "DEVELOPER_NOT_FOUND",
        message: "GitHub user was not found",
      },
    });
  });
});



