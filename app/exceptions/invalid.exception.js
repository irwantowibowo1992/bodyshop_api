const { StatusCodes } = require('http-status-codes');

class Invalid extends Error {
  constructor(message) {
    super(message);

    this.printMsg = message;
    this.statusCode = StatusCodes.BAD_REQUEST;
  }

  handle() {}
}

module.exports = Invalid;
