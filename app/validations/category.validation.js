const Joi = require('joi');

const categoryValidationSchema = {
  addCategory: Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
  }),
};

module.exports = categoryValidationSchema;
