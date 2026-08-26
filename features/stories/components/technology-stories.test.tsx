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

/**
 * Mock the getStories function.
 */
vi.mock("../api/stories", () => ({
  getStories: vi.fn(),
}));

/**
 * The mocked getStories function.
 */
const mockedGetStories =
  vi.mocked(getStories);

/**
 * Renders the TechnologyStories component.
 */
function renderTechnologyStories() {
  // Create a query client
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  // Render the TechnologyStories component
  return render(
    <QueryClientProvider client={queryClient}>
      <TechnologyStories />
    </QueryClientProvider>
  );
}

/**
 * Tests for the TechnologyStories component.
 */
describe("TechnologyStories", () => {
  /**
   * Clear all mocks before each test.
   */
  beforeEach(() => {
    vi.clearAllMocks();
  });

  /**
   * Loads another page of stories when Load more is clicked.
   */
  it("loads another page of stories when Load more is clicked", async () => {
    // Set up the user event
    const user = userEvent.setup();

    // Mock the getStories function to return the stories
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

    // Render the TechnologyStories component
    renderTechnologyStories();

    // Expect the first story to be in the document
    expect(
      await screen.findByText("Story One")
    ).toBeInTheDocument();

    // Expect the second story to be in the document
    expect(
      screen.getByText("Story Two")
    ).toBeInTheDocument();

    // Get the Load more button
    const loadMoreButton =
      screen.getByRole("button", {
        name: /load more/i,
      });

    // Click the Load more button
    await user.click(loadMoreButton);

    // Expect the third story to be in the document
    expect(
      await screen.findByText("Story Three")
    ).toBeInTheDocument();

    // Expect the getStories function to have been called with the correct arguments
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

    // Expect the end of the list message to be in the document
    expect(
      screen.getByText(
        "You've reached the end of the list."
      )
    ).toBeInTheDocument();
  });

  /**
   * Shows an error state and retries successfully.
   */
  it("shows an error state and retries successfully", async () => {
    // Set up the user event
    const user = userEvent.setup();
  
    // Mock the getStories function to return an error
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

    // Render the TechnologyStories component
    renderTechnologyStories();
  
    // Expect the error message to be in the document
    expect(
      await screen.findByText(
        "Unable to load stories"
      )
    ).toBeInTheDocument();

    // Get the Retry button
    const retryButton =
      screen.getByRole("button", {
        name: /try again/i,
      });

    // Click the Retry button
    await user.click(retryButton);

    // Expect the recovered story to be in the document
    expect(
      await screen.findByText(
        "Recovered Story"
      )
    ).toBeInTheDocument();

    // Expect the getStories function to have been called twice
    expect(mockedGetStories)
      .toHaveBeenCalledTimes(2);

    // Expect the error message to not be in the document
    expect(
      screen.queryByText(
        "Unable to load stories"
      )
    ).not.toBeInTheDocument();
  });
});