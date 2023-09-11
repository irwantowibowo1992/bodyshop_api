const Joi = require('joi');

const productValidationSchema = {
  addCategory: Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required().min(0),
    subCategory: Joi.string().uuid().required(),
  }),
};

module.exports = productValidationSchema;
