const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const discountValidationSchema = {
  addProductDiscount: Joi.object({
    product: Joi.objectId().required(),
    discount: Joi.number().required(),
    discount_type: Joi.string().valid('percent', 'price'),
    valid_from: Joi.date().required(),
    valid_to: Joi.date().required(),
  }),

  updateProductDiscount: Joi.object({
    discount: Joi.number().required().min(0),
    discount_type: Joi.string().valid('percent', 'price'),
    valid_from: Joi.date().required(),
    valid_to: Joi.date().required(),
  }),
};

module.exports = discountValidationSchema;
