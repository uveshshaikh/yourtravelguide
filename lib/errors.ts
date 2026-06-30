/**
 * Application error model.
 *
 * One typed hierarchy so every layer (repositories → services → route handlers)
 * throws and handles errors consistently, and so we never leak internal detail
 * to users. `AppError` is operational (expected, safe to message); anything else
 * is a programmer error and gets a generic response + full log.
 */

export const ErrorCode = {
  VALIDATION: 'VALIDATION',
  NOT_FOUND: 'NOT_FOUND',
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  CONFLICT: 'CONFLICT',
  RATE_LIMITED: 'RATE_LIMITED',
  UPSTREAM: 'UPSTREAM',
  INTERNAL: 'INTERNAL',
} as const;

export type ErrorCode = (typeof ErrorCode)[keyof typeof ErrorCode];

const STATUS: Record<ErrorCode, number> = {
  VALIDATION: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  RATE_LIMITED: 429,
  UPSTREAM: 502,
  INTERNAL: 500,
};

export class AppError extends Error {
  readonly code: ErrorCode;
  readonly httpStatus: number;
  /** Safe to show the user. */
  readonly isOperational = true;
  /** Structured, non-sensitive context for logs. */
  readonly context?: Record<string, unknown>;

  constructor(
    code: ErrorCode,
    message: string,
    options?: { context?: Record<string, unknown>; cause?: unknown },
  ) {
    super(message, { cause: options?.cause });
    this.name = 'AppError';
    this.code = code;
    this.httpStatus = STATUS[code];
    this.context = options?.context;
  }

  static validation(message: string, context?: Record<string, unknown>) {
    return new AppError(ErrorCode.VALIDATION, message, { context });
  }
  static notFound(message = 'Resource not found', context?: Record<string, unknown>) {
    return new AppError(ErrorCode.NOT_FOUND, message, { context });
  }
  static unauthorized(message = 'Authentication required') {
    return new AppError(ErrorCode.UNAUTHORIZED, message);
  }
  static forbidden(message = 'You do not have access to this resource') {
    return new AppError(ErrorCode.FORBIDDEN, message);
  }
  static internal(message = 'Something went wrong', cause?: unknown) {
    return new AppError(ErrorCode.INTERNAL, message, { cause });
  }
}

export function isAppError(error: unknown): error is AppError {
  return error instanceof AppError;
}

/** Narrow any thrown value to an Error for logging. */
export function toError(value: unknown): Error {
  if (value instanceof Error) return value;
  return new Error(typeof value === 'string' ? value : JSON.stringify(value));
}
