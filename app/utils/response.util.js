const humps = require('humps');
const { StatusCodes } = require('http-status-codes');

class SuccessResult {
  static make(res) {
    this.res = res;
    return this;
  }

  static send(data, total) {
    if (Array.isArray(data)) {
      return this.res.status(StatusCodes.OK).send({
        data: {
          results: data,
          total,
        },
      });
    }
    return this.res.status(StatusCodes.OK).send({
      data,
    });
  }

  static sendWithHumps(data, total) {
    if (Array.isArray(data)) {
      return this.res.status(StatusCodes.OK).send({
        data: {
          results: humps.camelizeKeys(data),
          total,
        },
      });
    }
    return this.res.status(StatusCodes.OK).send({
      data: humps.camelizeKeys(data),
    });
  }

  static sendMessage(message) {
    return this.res.status(StatusCodes.OK).send({
      message,
    });
  }

  static sendMessageData(data, message, other) {
    return this.res.status(StatusCodes.OK).send({
      message,
      data,
      ...other,
    });
  }

  static sendMessageDataWithHumps(data, message, other) {
    return this.res.status(StatusCodes.OK).send({
      message,
      data: humps.camelizeKeys(data),
      ...other,
    });
  }

  static sendDownload(path, fileName) {
    if (fileName) return this.res.download(path, fileName);
    return this.res.download(path, fileName);
  }
}

module.exports = SuccessResult;
