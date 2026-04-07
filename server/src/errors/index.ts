class NotFoundError extends Error {
  statusCode = 404;
  constructor(message: string) {
    super(message);
    this.name = "NotFoundError";
  }
}

class UnauthorizedError extends Error {
  statusCode = 403;
  constructor(message: string) {
    super(message);
    this.name = "UnauthorizedError";
  }
}

export { NotFoundError, UnauthorizedError };
