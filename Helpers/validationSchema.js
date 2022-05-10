const Joi = require("@hapi/joi");

const registerSchema = Joi.object({
  name: Joi.string().required().min(3).max(30),
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(6).lowercase().required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(6).lowercase().required(),
});

module.exports = { registerSchema, loginSchema };
