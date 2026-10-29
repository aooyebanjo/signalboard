
/**
 * Unit tests for the validateGithubUsername function.
 * what is the command to run this test file? 
 * --> npm test features/analytics/utils/validate-github-username.test.ts
 */
import {
  describe,
  expect,
  it,
} from "vitest";

/**
 * Function to be tested, with correct and incorrect usernames.
 */
import {
  validateGithubUsername,
} from './validate-github-username';

/**
 * Test suite for the validateGithubUsername function.
 */
describe("validateGithubUsername", () => {
  /**
   * Test case for valid usernames.
   */
  it.each([
    'octocat',
    'torvalds',
    'my-user',
    'developer123',
  ])("accepts valid username %s", (username) => {
    expect(
      validateGithubUsername(username)
    ).toBe(true);
  });

  /**
   * Test case for invalid usernames.
   */
  it.each([
    "",
    ".invalid",
    "invalid-",
    "invalid_user",
    "invalid--user",
    "a".repeat(40),
  ])("rejects invalid username %s", (username) => {
    expect(
      validateGithubUsername(username)
    ).toBe(false);
  });
});
