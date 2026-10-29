
/**
 * React component tests for the DeveloperUsernameForm.
  */
import {
  describe,
  expect,
  it,
  vi,
} from "vitest";

/**
 * Utility functions for testing.
 */
import {
  fireEvent,
  render,
  screen,
} from "@testing-library/react";

/**
 * React component to be tested.
 */
import {
  DeveloperUsernameForm,
} from "./developer-username-form";


/**
 * Test suite for the DeveloperUsernameForm component.
 */
describe("DeveloperUsernameForm", () => {
  /**
   * Test case for rendering the initial username.
   */
  it("renders the initial username", () => {
    /**
     * Mock onSubmit function.
     */
    const onSubmit = vi.fn();

    /**
     * Render the component.
     */
    render(
      <DeveloperUsernameForm
        username="octocat"
        onSubmit={onSubmit}
      />
    );

    /**
     * Assert that the username input field has the correct value.
     */
    expect(
      screen.getByRole("textbox", {
        name: /github username/i
      })
    ).toHaveValue("octocat");
  });

  /**
   * Test case for submitting a valid username.
   */
  it("submits a valid username", () => {
    /**
     * Mock onSubmit function.
     */
    const onSubmit = vi.fn();

    /**
     * Render the component.
     */
    render(
      <DeveloperUsernameForm
        username="octocat"
        onSubmit={onSubmit}
      />
    );
    /**
     * Simulate user typing a new username.
     */
    fireEvent.change(
      screen.getByRole('textbox', {
        name: /github username/i
      }),
      {
        target: {
          value: 'torvalds',
        },
      }
    );

    /**
     * Simulate user clicking the analyze button.
     */
    fireEvent.click(
      screen.getByRole('button', {
        name: /analyze/i
      })
    );

    /**
     * Assert that the onSubmit callback was called with the new username.
     */
    expect(onSubmit).toHaveBeenCalledWith("torvalds");
  });

  /**
   * Test case for rejecting an invalid username.
   */
  it("rejects an invalid username", () => {
    /**
     * Mock onSubmit function.
     */
    const onSubmit = vi.fn();
    /**
     * Render the component.
     */
    render(
      <DeveloperUsernameForm
        username="octocat"
        onSubmit={onSubmit}
      />
    );
    /**
     * Simulate user typing an invalid username.
     */
    fireEvent.change(
      screen.getByRole("textbox", {
        name: /github username/i
      }),
      {
        target: {
          value: "invalid_user",
        },
      }
    );

    /**
     * Simulate user clicking the analyze button.
     */
    fireEvent.click(
      screen.getByRole("button", {
        name: /analyze/i
      })
    );

    /**
     * Assert that an error message is displayed for the invalid username.
     */
    expect(
      screen.getByRole("alert")
    ).toHaveTextContent(
      /please enter a valid github username/i
    );

    /**
     * Assert that the onSubmit callback was not called.
     */
    expect(onSubmit).not.toHaveBeenCalled();
  });
});
