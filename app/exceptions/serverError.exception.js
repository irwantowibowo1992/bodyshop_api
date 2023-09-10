const { StatusCodes } = require('http-status-codes');

class NotFound extends Error {
  constructor(message) {
    super(message);

    this.printMsg = message;
    this.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
  }

  handle() {}
}

module.exports = NotFound;
