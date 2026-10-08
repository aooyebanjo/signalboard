
/**
 * A type that is used to specify the type of coordinate,
 * latitude is between -90 and 90, and longitude is between -180 and 180.
 */
export type CoordinateType = 
    | "latitude" 
    | "longitude";

/**
 * A function that is used to parse a coordinate value.
 * @param value - The value of the coordinate.
 * @param type - The type of coordinate.
 * @returns The parsed coordinate value.
 */
export function parseCoordinates(
  value: string | null,
  type: CoordinateType,
): number | null {

  /**
   * If the value is null or an empty string, return null.
   */
  if (value === null || value.trim() === "") {
    return null;
  }

  /**
   * Convert the value to a number.
   */
  const coordinate = Number(value);

  /**
   * If the coordinate is not a finite number, return null.
   */
  if(!Number.isFinite(coordinate)) {
    return null;
  }

  /**
   * The minimum value of the coordinate, ensures that latitude coordinate is greater than -90 and longitude coordinate is greater than -180.
   */
  const minimum = type === "latitude" ? -90 : -180;

  /**
   * The maximum value of the coordinate, ensures that latitude coordinate is less than 90 and longitude coordinate is less than 180.
   */
  const maximum = type === "latitude" ? 90 : 180;

  /**
   * If the coordinate is not between the minimum and maximum values, return null.
   */
  if(
    (coordinate < minimum) || 
    (coordinate > maximum)
  ) {
    return null;
  }
  
  /**
   * Return the coordinate.
   */
  return coordinate;
};

