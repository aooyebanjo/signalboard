
import { describe, expect, it } from "vitest";

import { parseCoordinates } from "./parse-coordinate";

/**
 * Test suite for the parseCoordinates function.
 */
describe("parseCoordinates", () => {
  /**
   * Test case for parsing a valid latitude coordinate.
   */
  it("parses valid latitude coordinate", () => {
    expect(
      parseCoordinates("38.895", "latitude")
    ).toBe(38.895);
  });

  /**
   * Test case for parsing a valid longitude coordinate.
   */
  it("parses valid longitude coordinate", () => {
    expect(
      parseCoordinates("-77.086", "longitude")
    ).toBe(-77.086);
  });

  /**
   * Test case for accepting zero as a valid coordinate.
   */
  it("accepts zero as a valid coordinate", () => {
    expect(
      parseCoordinates("0", "latitude")
    ).toBe(0);
    expect(
      parseCoordinates("0", "longitude")
    ).toBe(0);
  });

  /**
   * Test case for rejecting latitude outside its range.
   */
  it("rejects latitude outside its range", () => {
    expect(
      parseCoordinates("91", "latitude")
    ).toBeNull();
    expect(
      parseCoordinates("-91", "latitude")
    ).toBeNull();
  });

  /**
   * Test case for rejecting longitude outside its range.
   */
  it("rejects longitude outside its range", () => {
    expect(
      parseCoordinates("181", "longitude")
    ).toBeNull();
    expect(
      parseCoordinates("-181", "longitude")
    ).toBeNull();
  });

  /**
   * Test case for rejecting nonnumeric values.
   */
  it("rejects nonnumeric values", () => {
    expect(
      parseCoordinates("hello", "latitude")
    ).toBeNull();
    expect(
      parseCoordinates("hello", "longitude")
    ).toBeNull();
  });

  /**
   * Test case for rejecting missing and empty values.
   */
  it("rejects missing and empty values", () => {
    expect(
      parseCoordinates(null, "latitude")
    ).toBeNull();
    expect(
      parseCoordinates(null, "longitude")
    ).toBeNull();
    expect(
      parseCoordinates("", "latitude")
    ).toBeNull();
    expect(
      parseCoordinates("", "longitude")
    ).toBeNull();
  });
});

