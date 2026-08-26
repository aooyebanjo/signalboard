import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";

import { GET } from "./route";
import { getTopStories } from "@/features/stories/api/hacker-news";

/**
 * Mock the getTopStories function.
 */
vi.mock("@/features/stories/api/hacker-news", () => ({
  getTopStories: vi.fn(),
}));

/**
 * The mocked getTopStories function.
 */
const mockedGetTopStories =
  vi.mocked(getTopStories);

/**
 * Tests for the GET /api/stories route.
 */
describe("GET /api/stories", () => {
  /**
   * Clear all mocks before each test.
   */
  beforeEach(() => {
    vi.clearAllMocks();
  });

  /**
   * Requests limit + 1 stories and returns only the requested limit.
   */
  it("requests limit + 1 stories and returns only the requested limit", async () => {
    // Create 11 stories
    const stories = Array.from(
      { length: 11 },
      (_, index) => ({
        id: index + 1,
        title: `Story ${index + 1}`,
        author: "alice",
        score: 100,
        commentCount: 10,
        publishedAt: new Date(
          "2026-08-26T12:00:00.000Z"
        ),
        url: "https://example.com",
      })
    );

    // Mock the getTopStories function to return the stories
    mockedGetTopStories.mockResolvedValue(
      stories
    );

    // Create a request to the API
    const request = new Request(
      "http://localhost:3000/api/stories?page=1&limit=10"
    );

    // Send the request to the API
    const response = await GET(request);

    // Get the response body
    const body = await response.json();

    // Expect the getTopStories function to have been called with the correct arguments
    expect(mockedGetTopStories).toHaveBeenCalledWith(
      11,
      0
    );

    // Expect the response status to be 200
    expect(response.status).toBe(200);

    // Expect the response body to have the correct length
    expect(body.data).toHaveLength(10);

    // Expect the response body to have the correct pagination
    expect(body.pagination).toEqual({
      page: 1,
      limit: 10,
      hasMore: true,
    });
  });

  /**
   * Sets hasMore to false when there are no additional stories.
   */
  it("sets hasMore to false when there are no additional stories", async () => {
    // Create 4 stories
    const stories = Array.from(
      { length: 4 },
      (_, index) => ({
        id: index + 1,
        title: `Story ${index + 1}`,
        author: "alice",
        score: 100,
        commentCount: 10,
        publishedAt: new Date(
          "2026-08-26T12:00:00.000Z"
        ),
        url: "https://example.com",
      })
    );

    // Mock the getTopStories function to return the stories
    mockedGetTopStories.mockResolvedValue(
      stories
    );

    // Create a request to the API
    const request = new Request(
      "http://localhost:3000/api/stories?page=3&limit=10"
    );

    // Send the request to the API
    const response = await GET(request);

    // Get the response body
    const body = await response.json();

    // Expect the getTopStories function to have been called with the correct arguments
    expect(mockedGetTopStories).toHaveBeenCalledWith(
      11,
      20
    );

    // Expect the response status to be 200
    expect(response.status).toBe(200);

    // Expect the response body to have the correct length
    expect(body.data).toHaveLength(4);

    // Expect the response body to have the correct pagination
    expect(body.pagination).toEqual({
      page: 3,
      limit: 10,
      hasMore: false,
    });
  });
});