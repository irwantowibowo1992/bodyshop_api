const { StatusCodes } = require('http-status-codes');

class NotFound extends Error {
  constructor(message) {
    super(message);

    this.printMsg = message;
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }

  handle() {}
}

module.exports = NotFound;
