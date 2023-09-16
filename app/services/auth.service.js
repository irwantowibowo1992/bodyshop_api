const humps = require('humps');
const InvalidError = require('../exceptions/invalid.exception');
const NotFoundError = require('../exceptions/notFound.exception');
const UnauthorizedError = require('../exceptions/unauthorized.exception');
const JwtToken = require('../utils/jwt.util');
const Users = require('../models/user.model');

async function register(data) {
  const checkUser = await Users.findOne({ email: data.email });

  if (checkUser) {
    throw new Invalid('Email sudah terdaftar');
  }

  await Users.create({
    name: data.name,
    email: data.email,
    password: data.password,
  });
}

async function login(data) {
  const { email, password, isRemember = false } = data;

  if (!email || !password) {
    throw new InvalidError('Email atau password salah');
  }

  const result = await Users.findOne({ email });

  if (!result) {
    throw new NotFoundError('User tidak ditemukan');
  }

  const isPasswordCorrect = await result.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new UnauthorizedError('Invalid Credential');
  }

  return afterLogin(result, isRemember);
}

async function afterLogin(user, isRemember) {
  const paramToken = {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    username: user.username,
    role: user.role,
  };

  const expiredIn = {
    duration: 1,
    shorthandUnit: 'd',
  };

  if (!isRemember) {
    expiredIn.duration = 3;
    expiredIn.shorthandUnit = 'h';
  }

  const token = JwtToken.setToken(paramToken, expiredIn);

  const dataLogin = {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      username: user.username,
      role: user.role,
    },
    token,
    isRemember,
  };

  return humps.camelizeKeys(dataLogin);
}

module.exports = {
  register,
  login,
};
