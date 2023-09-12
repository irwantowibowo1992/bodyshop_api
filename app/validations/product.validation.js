const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const productValidationSchema = {
  addProduct: Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required().min(0),
    subCategory: Joi.objectId(),
    images: Joi.array()
      .items({
        url: Joi.string().required(),
        isMainImage: Joi.boolean(),
      })
      .optional(),
  }),
};

module.exports = productValidationSchema;
