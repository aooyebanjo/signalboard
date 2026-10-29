
import {
  afterEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest';

/**
 * Import the functions to be tested
 */
import {
  getAnalytics
} from "./analytics";

/**
 * Import the AnalyticsApiError class to use for error handling.
 */
import {
  AnalyticsApiError,
} from "./analytics-api-error";

/**
 * Test fixture for analytics overview data
 */
import {
  analyticsFixture
} from "../test/analytics-fixtures";

/**
 * Test suite for the getAnalytics function.
 */
describe("getAnalytics", () => {
  /**
   * Clean up the test environment after each test.
   */
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  /**
   * Test case for successfully fetching and validating analytics data.
   */
  it("fetches and validates analytics data", async () => {
    /**
     * Mock the fetch API call
     */
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({
        data: analyticsFixture,
      }),
    });

    /**
     * Stub the global fetch API with the mock function
     */
    vi.stubGlobal("fetch", fetchMock);

    /**
     * Call the function to be tested
     */
    const result = await getAnalytics("octocat");

    /**
     * Assert that the fetch API was called with the correct URL
     */
    expect(fetchMock).toHaveBeenCalledWith(
      `/api/analytics?username=octocat`
    );

    /**
     * Assert that the result is equal to the test fixture
     */
    expect(result).toEqual(analyticsFixture);
  });

  /**
   * Test case for when the API returns an error.
   */
  it("throws when the API returns an error", async () => {
    /**
     * Mock the fetch API call
     */
    const fetchMock = vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
    });
    /**
     * Stub the global fetch API with the mock function
     */
    vi.stubGlobal("fetch", fetchMock);
    /**
     * Call the function to be tested
     */
    await expect(
      getAnalytics("octocat")
    ).rejects.toThrow(
      "Unable to retrieve analytics for HTTP 500"
    );
  });

  /**
   * Test case for when the response data is invalid.
   */
  it("rejects invalid response data", async () => {
    /**
     * Mock the fetch API call
     */
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({
        data: {
          stories: {
            totalStories: "twenty",
          }
        }
      }),
    });
    /**
     * Stub the global fetch API with the mock function
     */
    vi.stubGlobal("fetch", fetchMock);
    /**
     * Call the function to be tested
     */
    await expect(
      getAnalytics("octocat")
    ).rejects.toThrow();
  });

  /**
   * Test case for when the username is encoded in the URL.
   */
  it("encodes the username in the URL", async () => {
    /**
     * Mock the fetch API call
     */
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({
        data: analyticsFixture
      })
    });
    /**
     * Stub the global fetch API with the mock function
     */
    vi.stubGlobal("fetch", fetchMock);
    /**
     * Call the function to be tested
     */
    await getAnalytics("test user");
    /**
     * Assert that the fetch API was called with the correct URL
     */
    expect(fetchMock).toHaveBeenCalledWith(
      `/api/analytics?username=test+user`
    );
  });

  /**
   * Test case for when the GitHub user is missing.
   */
  it("throws a typed error for a missing GitHub user", async () => {
    /**
     * Mock the fetch API call
     */
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        status: 404,
      })
    );

    /**
     * Call the function to be tested and assert that it rejects with an AnalyticsApiError
     */
    await expect(
      getAnalytics("missing-user")
    ).rejects.toMatchObject({
      name: "AnalyticsApiError",
      status: 404,
      message:
        'GitHub user "missing-user" was not found.',
    });
  });

  /**
   * Test case for when the AbortSignal is passed to fetch.
   */
  it("passes the AbortSignal to fetch", async () => {
    /**
     * Create an AbortController to generate a signal for aborting the fetch request.
     */
    const controller = new AbortController();

    /**
     * Mock the fetch API call
     */
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        data: analyticsFixture,
      }),
    });

    /**
     * Stub the global fetch API with the mock function
     */
    vi.stubGlobal("fetch", fetchMock);

    /**
     * Call the function to be tested
     */
    await getAnalytics(
      "octocat",
      controller.signal
    );

    /**
     * Assert that the fetch API was called with the correct URL
     */
    expect(fetchMock).toHaveBeenCalledWith(
      "/api/analytics?username=octocat",
      {
        signal: controller.signal,
      }
    );
  });
});
