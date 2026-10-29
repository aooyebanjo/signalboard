/**
 * Interface for the analytics API error.
 */
export class AnalyticsApiError extends Error {
  /**
   * Create a new instance of the analytics API error.
   * @param message - The error message.
   * @param status - The HTTP status code.
   */
  constructor(
    message: string,
    public readonly status: number
  ) {
    super(message);

    this.name = "AnalyticsApiError";
  }
}