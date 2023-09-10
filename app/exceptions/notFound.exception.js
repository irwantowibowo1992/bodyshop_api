const { StatusCodes } = require('http-status-codes');

class NotFound extends Error {
  constructor(message) {
    super(message);

    this.printMsg = message;
    this.statusCode = StatusCodes.NOT_FOUND;
  }

  handle() {}
}

module.exports = NotFound;
