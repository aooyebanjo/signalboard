export type ApiErrorCode =
  | "INVALID_QUERY_PARAMETERS"
  | "INVALID_STORY_ID"
  | "STORY_NOT_FOUND"
  | "STORY_UNAVAILABLE"
  | "STORIES_UNAVAILABLE"
  | "INTERNAL_ERROR"
  | "DEVELOPER_NOT_FOUND"
  | "DEVELOPER_UNAVAILABLE"
  | "INVALID_DEVELOPER_USERNAME"
  | "REPOSITORIES_UNAVAILABLE"
  | "INSIGHTS_UNAVAILABLE";

/**
 * The interface for the API error response
 */
export interface ApiErrorResponse {
  error: {
    code: ApiErrorCode;
    message: string;
  };
};

/**
 * Creates an API error response
 * @param code - The code of the error
 * @param message - The message of the error
 * @param status - The status code of the error
 * @returns The response object
 */
export function createApiErrorResponse(
  code: ApiErrorCode,
  message: string,
  status: number
) {
  const body: ApiErrorResponse = {
    error: {
      code,
      message,
    },
  };

  return Response.json(body, { status });
};
