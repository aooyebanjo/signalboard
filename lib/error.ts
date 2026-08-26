import type { ApiErrorCode } from "./api-error";

export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public code?: ApiErrorCode
  ) {
    super(message);

    this.name = "ApiError";
  }
}

export class NotFoundError extends Error {
  constructor(message: string) {
    super(message);

    this.name = "NotFoundError";
  }
}