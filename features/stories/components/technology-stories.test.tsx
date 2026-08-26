import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import {
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";

import { TechnologyStories } from "./technology-strories";
import { getStories } from "../api/stories";

vi.mock("../api/stories", () => ({
  getStories: vi.fn(),
}));

const mockedGetStories =
  vi.mocked(getStories);

function renderTechnologyStories() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <TechnologyStories />
    </QueryClientProvider>
  );
}

describe("TechnologyStories", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("loads another page of stories when Load more is clicked", async () => {
    const user = userEvent.setup();

    mockedGetStories
      .mockResolvedValueOnce({
        data: [
          {
            id: 1,
            title: "Story One",
            author: "alice",
            score: 100,
            commentCount: 10,
            publishedAt: new Date(
              "2026-08-26T12:00:00.000Z"
            ),
            url: "https://example.com/1",
          },
          {
            id: 2,
            title: "Story Two",
            author: "bob",
            score: 90,
            commentCount: 5,
            publishedAt: new Date(
              "2026-08-26T11:00:00.000Z"
            ),
            url: "https://example.com/2",
          },
        ],
        pagination: {
          page: 1,
          limit: 10,
          hasMore: true,
        },
      })
      .mockResolvedValueOnce({
        data: [
          {
            id: 3,
            title: "Story Three",
            author: "carol",
            score: 80,
            commentCount: 3,
            publishedAt: new Date(
              "2026-08-26T10:00:00.000Z"
            ),
            url: "https://example.com/3",
          },
        ],
        pagination: {
          page: 2,
          limit: 10,
          hasMore: false,
        },
      });

    renderTechnologyStories();

    expect(
      await screen.findByText("Story One")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Story Two")
    ).toBeInTheDocument();

    const loadMoreButton =
      screen.getByRole("button", {
        name: /load more/i,
      });

    await user.click(loadMoreButton);

    expect(
      await screen.findByText("Story Three")
    ).toBeInTheDocument();

    await waitFor(() => {
      expect(mockedGetStories)
        .toHaveBeenNthCalledWith(
          1,
          1,
          10
        );

      expect(mockedGetStories)
        .toHaveBeenNthCalledWith(
          2,
          2,
          10
        );
    });

    expect(
      screen.getByText(
        "You've reached the end of the list."
      )
    ).toBeInTheDocument();
  });

  it("shows an error state and retries successfully", async () => {
    const user = userEvent.setup();
  
    mockedGetStories
      .mockRejectedValueOnce(
        new Error("Network failure")
      )
      .mockResolvedValueOnce({
        data: [
          {
            id: 1,
            title: "Recovered Story",
            author: "alice",
            score: 120,
            commentCount: 15,
            publishedAt: new Date(
              "2026-08-26T12:00:00.000Z"
            ),
            url: "https://example.com/recovered",
          },
        ],
        pagination: {
          page: 1,
          limit: 10,
          hasMore: false,
        },
      });
  
    renderTechnologyStories();
  
    expect(
      await screen.findByText(
        "Unable to load stories"
      )
    ).toBeInTheDocument();
  
    const retryButton =
      screen.getByRole("button", {
        name: /try again/i,
      });
  
    await user.click(retryButton);
  
    expect(
      await screen.findByText(
        "Recovered Story"
      )
    ).toBeInTheDocument();
  
    expect(mockedGetStories)
      .toHaveBeenCalledTimes(2);
  
    expect(
      screen.queryByText(
        "Unable to load stories"
      )
    ).not.toBeInTheDocument();
  });
});