import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";

import { GET } from "./route";
import { getTopStories } from "@/features/stories/api/hacker-news";

vi.mock("@/features/stories/api/hacker-news", () => ({
  getTopStories: vi.fn(),
}));

const mockedGetTopStories =
  vi.mocked(getTopStories);

describe("GET /api/stories", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("requests limit + 1 stories and returns only the requested limit", async () => {
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

    mockedGetTopStories.mockResolvedValue(
      stories
    );

    const request = new Request(
      "http://localhost:3000/api/stories?page=1&limit=10"
    );

    const response = await GET(request);

    const body = await response.json();

    expect(mockedGetTopStories).toHaveBeenCalledWith(
      11,
      0
    );

    expect(response.status).toBe(200);

    expect(body.data).toHaveLength(10);

    expect(body.pagination).toEqual({
      page: 1,
      limit: 10,
      hasMore: true,
    });
  });

  it("sets hasMore to false when there are no additional stories", async () => {
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
  
    mockedGetTopStories.mockResolvedValue(
      stories
    );
  
    const request = new Request(
      "http://localhost:3000/api/stories?page=3&limit=10"
    );
  
    const response = await GET(request);
  
    const body = await response.json();
  
    expect(mockedGetTopStories).toHaveBeenCalledWith(
      11,
      20
    );
  
    expect(response.status).toBe(200);
  
    expect(body.data).toHaveLength(4);
  
    expect(body.pagination).toEqual({
      page: 3,
      limit: 10,
      hasMore: false,
    });
  });
});