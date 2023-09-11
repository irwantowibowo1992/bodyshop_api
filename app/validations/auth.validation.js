const Joi = require('joi');

function normalizePhone(phone) {
  phone = String(phone).trim();
  if (phone.startsWith('+62')) {
    phone = '0' + phone.slice(3);
  } else if (phone.startsWith('62')) {
    phone = '0' + phone.slice(2);
  }
  return testPhone(phone.replace(/[- .]/g, ''));
}

function testPhone(phone) {
  if (!phone || !/^08[1-9][0-9]{7,10}$/.test(phone)) {
    return false;
  }
  return true;
}

const authValidationSchema = {
  register: Joi.object({
    name: Joi.string().required().min(3).max(100),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6).max(30),
  }),

  loginEmail: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(30).required(),
  }),
};

module.exports = authValidationSchema;
