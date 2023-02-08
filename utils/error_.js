class _Error extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.msg = message;
    this.isOperational = true;
    // to get the stack trace
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = _Error;
