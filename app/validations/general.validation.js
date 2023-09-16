const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const generalValidationSchema = {
  detail: Joi.object({
    id: Joi.objectId().required(),
  }),
};

module.exports = generalValidationSchema;
