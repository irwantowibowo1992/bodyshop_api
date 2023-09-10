require('dotenv').config();
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET_KEY;
const UnauthorizedError = require('../exceptions/unauthorized.exception');
const ServerError = require('../exceptions/serverError.exception');
const InvalidError = require('../exceptions/invalid.exception');

function auth(roles) {
  return (req, res, next) => {
    try {
      let decodeThisToken;
      decodeThisToken = getToken(req);
      req.user = decodeThisToken;

      if (!roles.includes(req.user.role)) {
        throw new UnauthorizedError('You are not authorized');
      }

      return next();
    } catch (error) {
      throw new ServerError(error);
    }
  };
}

function getToken(req) {
  const token = req.body.token || req.query.token || req.headers.authorization;

  if (!token) {
    throw new InvalidError('A token is required for authentication');
  }

  if (token.split(' ').length < 2) {
    throw new UnauthorizedError('Wrong authentication token format');
  }

  return decodeToken(token);
}

function decodeToken(token) {
  const strToken = token.split(' ')[1];
  return jwt.verify(strToken, jwtSecret);
}

module.exports = {
  auth,
};
