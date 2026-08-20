export type ApiErrorCode =
  | "INVALID_QUERY_PARAMETERS"
  | "INVALID_STORY_ID"
  | "STORY_NOT_FOUND"
  | "STORY_UNAVAILABLE"
  | "STORIES_UNAVAILABLE"
  | "INTERNAL_ERROR";

export interface ApiErrorResponse {
  error: {
    code: ApiErrorCode;
    message: string;
  };
}

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
}